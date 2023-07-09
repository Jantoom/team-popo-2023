import numpy as np
import cv2
import math
from sympy import Point
import shapely

from roboflow import Roboflow

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.angle = 0
        self.vector = []
    
    def getPos(self):
        return [self.x, self.y]
        

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
        # List of [X,Y] Positions
        self.positionList = []

        self.color = (0,255,0)

        # Calculated Later Data
        self.groupedPoints = []
        self.avgX = None
        self.avgY = None
        self.avgAngle = None
    
    def getPositionList(self):
        if (len(self.positionList) == 0):
            for point in self.points:
                self.positionList.append(point.getPos())
        return self.positionList
    
    def createVectors(self):
        for x in range(len(self.points)-1):
            self.points[x].vector = [self.points[x + 1].x - self.points[x].x, self.points[x + 1].y - self.points[x].y]

            if (self.points[x].vector[0]) == 0:
                if (self.points[x].vector[1] > 0):
                    angle = 90
                else:
                    angle = -90
            else:
                angle = math.degrees(math.atan((self.points[x].vector[1]) / (self.points[x].vector[0])))

            self.points[x].angle = angle
    
    def drawSelf(self, img):
        img = cv2.polylines(img, [np.array([self.getPositionList()], np.int32)], True, self.color, 2)
    
    def groupSimilarVectors(self, angleRange):
        for point in self.points:
            if (len(self.groupedPoints) == 0):
                self.groupedPoints.append([point])
                continue
            angleAdded = False
            for angleList in self.groupedPoints:
                if (abs(AngleDifference(angleList[0].angle, point.angle)) < angleRange):
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
                    totalAngle += point.angle

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

def getPolyShapeFromClass(objClass, polyShapes):
    shapes = []
    for polyShape in polyShapes:
        if polyShape.objClass == objClass:
            shapes.append(polyShape)
    return shapes

def AngleDifference(angle1, angle2):
    diff = ( angle2 - angle1 + 180 ) % 360 - 180
    if (diff < -180):
        return diff + 360
    else:
        return diff

loadedAPI = False
model = None
def loadAPI():
    global loadedAPI, model
    if not(loadedAPI):
        rf = Roboflow(api_key="ZFgVoiLIPSH5f3sOCidN")
        project = rf.workspace().project("parking-violations-lxf0d")
        model = project.version(2).model
        loadedAPI = True

def getAiData(file):
    if (('png', 'jpg', 'jpeg', 'tiff', 'bmp', 'gif').__contains__(file.split(".")[-1])):
        useAPI = True
    else:
        useAPI = False

    if useAPI:
        # infer on a local image
        img = cv2.imread(file)
        resized = cv2.resize(img, (500, 500), interpolation = cv2.INTER_AREA)
        cv2.imwrite("test500.png", resized)

        loadAPI()
        aiData = model.predict("test500.png").json()
    else:
        file1 = open(file, "r")
        aiData = eval(file1.read())
        file1.close()
    return aiData

def createPolyShapes(aiData):
    polyShapes = []
    for object in aiData["predictions"]:
        shape = PolyShape(object["class"], object["x"], object["y"], object["width"], object["height"], object["confidence"])
        for point in object["points"]:
            shape.points.append(Point(int(point['x']), int(point['y'])))

        polyShapes.append(shape)   
    return polyShapes

def drawImage(polyShapes, extendedPoint1, extendedPoint2):
    # Create Image Canvas
        img = np.zeros((500, 500, 3), dtype = "uint8")
        # Draw the Polygon Shapes
        for shape in polyShapes:
            shape.drawSelf(img)
    
        # Draws the vectors of the biggest group of similar angles (the longer sides of the parking line)
        for shape in getPolyShapeFromClass("lines", polyShapes):
            for x in range(len(shape.points) - 1):
                if shape.groupedPoints[-1].__contains__(shape.points[x]):
                    img = cv2.line(img,(shape.points[x].x,shape.points[x].y),(shape.points[x].x + shape.points[x].vector[0], shape.points[x].y + shape.points[x].vector[1]),(255,255,255), 3)
        
        # Draw Intersection line
        img = cv2.line(img,(extendedPoint1[0], extendedPoint1[1]),(extendedPoint2[0], extendedPoint2[1]),(0,0,255), 2)

        # Display image window
        cv2.imshow('Shapes', img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

def checkLineIntersection(line, polyPositionList):
    car_poly = shapely.geometry.Polygon(polyPositionList)
    lineI1 = shapely.geometry.LineString(line)

    doesIntersect = lineI1.intersects(car_poly)
    return doesIntersect

def start(file, showImage=False):
    # Get Masked Polygon Data From RoboFlow
    aiData = getAiData(file)
    # Create PolyShapes from points
    polyShapes = createPolyShapes(aiData)     

    # An array of booleans. Each boolean repesents if a parking line intersected with a car. Checks each line with each car.
    results = []

    for shape in getPolyShapeFromClass("lines", polyShapes):
        # Create Vectors from Point to Point in Polygon
        shape.createVectors()
        # Calculate and group all of the similar angled vectors within plus or minus range
        # Angle range used to group similar angled vectors
        angleRange = 40
        shape.groupSimilarVectors(angleRange)
        
        # Gets the Average Line of Longest sides of Parking Line
        averageLine = shape.getAverageLine(shape.height)

        
        for carShape in getPolyShapeFromClass("car", polyShapes):
            doesIntersect = checkLineIntersection(averageLine, carShape.getPositionList())
            results.append(doesIntersect)
    
    if showImage:
        drawImage(polyShapes, averageLine[0], averageLine[1])
    
    # Returns true if any line intersects with any car
    for result in results:
        if result:
            return result
    return False

print(start("data.txt", showImage=False))