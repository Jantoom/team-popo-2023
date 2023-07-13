import cv2
import numpy as np
from geometry import getPolyShapeFromClass

def drawImage(polyShapes, extendedLines, file):
        # Create Image Canvas
        # img = np.zeros((512, 512, 3), dtype = "uint8")
        img = cv2.imread(file)

        for extendedLine in extendedLines:
            # Draw Intersection line
            img = cv2.line(img,(extendedLine[0][0], extendedLine[0][1]),(extendedLine[1][0], extendedLine[1][1]),(0,0,255), 4)

        # Draw the Polygon Shapes
        for shape in polyShapes:
            img = drawPolygon(shape, img)
    
        # Draws the vectors of the biggest group of similar angles (the longer sides of the parking line)
        for shape in getPolyShapeFromClass("lines", polyShapes):
            for x in range(len(shape.points) - 1):
                if shape.groupedPoints[-1].__contains__(shape.points[x]):
                    img = cv2.line(img,(shape.points[x].x,shape.points[x].y),(shape.points[x].x + shape.points[x].vector.x, shape.points[x].y + shape.points[x].vector.y),(255,255,255), 3)
        cv2.imwrite("output.jpg", img)

        # # Display image window
        # cv2.imshow('Shapes', img)
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()

def drawPolygon(polyShape, img):
    img = cv2.polylines(img, [np.array([polyShape.getPositionList()], np.int32)], True, polyShape.color, 5)
    overlay = img.copy()
    overlay = cv2.fillPoly(overlay, [np.array([polyShape.getPositionList()], np.int32)], polyShape.overlayColor)
    img = cv2.addWeighted(img, 0.8, overlay, 1 - 0.8, 0)

    fontSize = 1
    fontWidth = 2
    fontColor = (255, 255, 255)

    img = cv2.putText(img, polyShape.objClass + " " + str(round(polyShape.confidence, 2)), (int(polyShape.x), int(polyShape.y)), cv2.FONT_HERSHEY_SIMPLEX, fontSize, fontColor, fontWidth)
    return img