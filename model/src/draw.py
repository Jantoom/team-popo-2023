import cv2, numpy as np
from src.carPark import filter_polyshapes_by_classification

def draw_image(polyShapes, extendedPoint1, extendedPoint2):
    # Create Image Canvas
        img = np.zeros((500, 500, 3), dtype = "uint8")
        # Draw the Polygon Shapes
        for shape in polyShapes:
            shape.drawSelf(img)
    
        # Draws the vectors of the biggest group of similar angles (the longer sides of the parking line)
        for shape in filter_polyshapes_by_classification("lines", polyShapes):
            for x in range(len(shape.points) - 1):
                if shape.groupedPoints[-1].__contains__(shape.points[x]):
                    img = cv2.line(img,(shape.points[x].x,shape.points[x].y),(shape.points[x].x + shape.points[x].vector[0], shape.points[x].y + shape.points[x].vector[1]),(255,255,255), 3)
        
        # Draw Intersection line
        img = cv2.line(img,(extendedPoint1[0], extendedPoint1[1]),(extendedPoint2[0], extendedPoint2[1]),(0,0,255), 2)

        # Display image window
        cv2.imshow('Shapes', img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()