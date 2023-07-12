import cv2
import numpy as np
from geometry import getPolyShapeFromClass

def drawImage(polyShapes, extendedPoint1, extendedPoint2):
        # Create Image Canvas
        img = np.zeros((512, 512, 3), dtype = "uint8")

        # Draw Intersection line
        img = cv2.line(img,(extendedPoint1[0], extendedPoint1[1]),(extendedPoint2[0], extendedPoint2[1]),(0,0,255), 2)

        # Draw the Polygon Shapes
        for shape in polyShapes:
            img = drawPolygon(shape, img)
            # img = shape.drawSelf(img)
    
        # Draws the vectors of the biggest group of similar angles (the longer sides of the parking line)
        # for shape in getPolyShapeFromClass("lines", polyShapes):
        #     for x in range(len(shape.points) - 1):
        #         if shape.groupedPoints[-1].__contains__(shape.points[x]):
        #             img = cv2.line(img,(shape.points[x].x,shape.points[x].y),(shape.points[x].x + shape.points[x].vector.x, shape.points[x].y + shape.points[x].vector.y),(255,255,255), 3)
        
        # Display image window
        cv2.imshow('Shapes', img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

def drawPolygon(polyShape, img):
    img = cv2.polylines(img, [np.array([polyShape.getPositionList()], np.int32)], True, polyShape.color, 1)
    overlay = img.copy()
    overlay = cv2.fillPoly(overlay, [np.array([polyShape.getPositionList()], np.int32)], polyShape.overlayColor)
    img = cv2.addWeighted(img, 0.8, overlay, 1 - 0.8, 0)
    img = cv2.putText(img, polyShape.objClass + " " + str(round(polyShape.confidence, 2)), (int(polyShape.x), int(polyShape.y)), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)
    return img