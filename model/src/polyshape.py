import math, cv2, numpy as np
from src.util import angle_difference
    
class PolyShape:
    def __init__(self, x, y, width, height, classification, confidence) -> None:
        # Bounding box data
        self.x = x
        self.y = y
        self.height = max(height, width)
        self.width = min(height, width)
        # Classification
        self.classification = classification
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
    
    def get_position_list(self):
        if (len(self.positionList) == 0):
            for point in self.points:
                self.positionList.append(point.get_pos())
        return self.positionList
    
    def create_vectors(self):
        """
        From a list of points, defines the vectors from each point to the next including magnitude and angle.
        """
        for x in range(len(self.points)-1):
            self.points[x].vector = [self.points[x + 1].x - self.points[x].x, self.points[x + 1].y - self.points[x].y]

            if (self.points[x].vector[0]) == 0:
                angle = 90 if self.points[x].vector[1] > 0 else -90
            else:
                angle = math.degrees(math.atan((self.points[x].vector[1]) / (self.points[x].vector[0])))

            self.points[x].angle = angle
    
    def group_similar_vectors(self, angleRange):
        for point in self.points:
            if (len(self.groupedPoints) == 0):
                self.groupedPoints.append([point])
                continue
            angleAdded = False
            for angleList in self.groupedPoints:
                if (abs(angle_difference(angleList[0].angle, point.angle)) < angleRange):
                    angleList.append(point)
                    angleAdded = True
            if not(angleAdded):
                self.groupedPoints.append([point])

        # Sorts Groups points so longest point group with similar angles will be last index
        self.groupedPoints.sort(key=len)
    
    def get_averages(self, points):
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
    
    def get_average_line(self, extendLength):
        averageX, averageY, averageAngle = self.get_averages(self.groupedPoints[-1])
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
    
    def draw_self(self, img):
        img = cv2.polylines(img, [np.array([self.getPositionList()], np.int32)], True, self.color, 2)
