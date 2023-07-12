import math
import cv2
import numpy as np

class Vector:
    def __init__(self, x, y, angle):
        self.x = x
        self.y = y
        self.angle = angle

class Point2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.vector = None
    
    def getPos(self):
        return [self.x, self.y]

    def createVectorToPoint(self, otherPoint):
        vecX = otherPoint.x - self.x
        vecY = otherPoint.y - self.y

        if (vecX) == 0:
            if (vecY > 0):
                angle = 90
            else:
                angle = -90
        else:
            # Bug here, cant be bothered fixing.
            # With atan(), vectors are negative in 2nd and 4th sectors of unit circle
            angle = math.degrees(math.atan((vecY) / (vecX)))

        self.vector = Vector(vecX, vecY, angle)
        

class PolyShape:
    def __init__(self, objClass, x, y, width, height, confidence) -> None:
        # Ai Poly Data
        self.objClass = objClass
        self.x = x
        self.y = y
        if (height > width):
            self.height = height
            self.width = width
        if (width > height):
            self.height = width
            self.width = height

        self.confidence = confidence
        # List of Point Objects
        self.points = []
        # List of [[x1,y1], ...] Positions
        self.positionList = []

        self.color = (0,255,0)
        self.overlayColor = (0, 255, 0)
        if objClass == "lines":
            self.overlayColor = (0, 255, 255)
            self.color = (0,255,255)
        elif objClass == "car":
            self.overlayColor = (255, 255, 0)
            self.color = (255,255,0)

        # Calculated Later Data
        self.groupedPoints = []
        self.avgX = None
        self.avgY = None
        self.avgAngle = None
    
    # In the format [[x1, y1], [x2, y2], ...]
    def getPositionList(self):
        return self.positionList
    
    def createVectors(self):
        for x in range(len(self.points)-1):
            self.points[x].createVectorToPoint(self.points[x + 1])
    
    def groupSimilarVectors(self, angleRange):
        for point in self.points:
            if (point.vector == None):
                continue
            if (len(self.groupedPoints) == 0):
                self.groupedPoints.append([point])
                continue
            angleAdded = False
            for angleList in self.groupedPoints:
                if (abs(AngleDifference(angleList[0].vector.angle, point.vector.angle)) < angleRange):
                    angleList.append(point)
                    angleAdded = True
            if not(angleAdded):
                self.groupedPoints.append([point])

        # Sorts Groups points so longest point group with similar angles will be last index
        self.groupedPoints.sort(key=len)
    
    def getAverages(self, points):
        if self.avgX == None or self.avgY == None or self.avgAngle == None:
            totalX = 0
            totalY = 0
            totalAngle = 0
            numPoints = 0

            for point in points:
                totalX += point.x
                totalY += point.y

                if (point != self.points[-1]):
                    totalAngle += point.vector.angle

                numPoints += 1
            
            self.avgX = totalX / numPoints
            self.avgY = totalY / numPoints
            self.avgAngle = totalAngle / numPoints

        return self.avgX, self.avgY, self.avgAngle
    
    def getAverageLine(self, extendLength):
        averageX, averageY, averageAngle = self.getAverages(self.groupedPoints[-1])
        averageX = self.x
        averageY = self.y

        extendedPoint1 = [
            int(averageX + (extendLength*math.cos(math.radians(averageAngle)))),
            int(averageY + (extendLength*math.sin(math.radians(averageAngle))))
            ]
        extendedPoint2 = [
            int(averageX + (-extendLength*math.cos(math.radians(averageAngle)))),
            int(averageY + (-extendLength*math.sin(math.radians(averageAngle))))
            ]

        return [extendedPoint1, extendedPoint2]

    def addPoint(self, x, y):
        self.points.append(Point2D(x, y))
        self.positionList.append([x, y])

def getPolyShapeFromClass(objClass, polyShapes):
    shapes = []
    for polyShape in polyShapes:
        if polyShape.objClass == objClass:
            shapes.append(polyShape)
    return shapes

def createPolyShapes(aiData):
    polyShapes = []
    for object in aiData["predictions"]:
        shape = PolyShape(object["class"], object["x"], object["y"], object["width"], object["height"], object["confidence"])
        for point in object["points"]:
            shape.addPoint(int(point['x']), int(point['y']))

        polyShapes.append(shape)   
    return polyShapes

def AngleDifference(angle1, angle2):
    diff = ( angle2 - angle1 + 180 ) % 360 - 180
    if (diff < -180):
        return diff + 360
    else:
        return diff