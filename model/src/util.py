import cv2
from sympy import Point
import shapely
from typing import List
from src.api import load_model
from src.polyshape import PolyShape

def angle_difference(angle1, angle2):
    diff = ( angle2 - angle1 + 180 ) % 360 - 180
    if (diff < -180):
        return diff + 360
    else:
        return diff
    
def filter_polyshapes_by_classification(classification, polyshapes) -> PolyShape:
    return [polyshape for polyshape in polyshapes if polyshape.objClass == classification]

def load_object_predictions(file_path):
    """
    Reads an image file then predicts bounding boxes of the objects in the image.
    """
    file_extension = file_path.split('.')[-1]
    if file_extension in ['png', 'jpg', 'jpeg', 'tiff', 'bmp', 'gif']:
        # Preprocess
        raw_image = cv2.imread(file_path)
        resized_image = cv2.resize(raw_image, (500, 500), interpolation = cv2.INTER_AREA)
        cv2.imwrite('test500.png', resized_image)
        # Predict
        return load_model().predict('test500.png').json()
    elif file_extension in ['txt']:
        # Extract
        with open(file_path, 'r') as raw_image:
            return eval(raw_image.read())
    else:
        raise Exception('File is not in a recognised image or text format.')

def create_polyshapes(bounding_boxes) -> List[PolyShape]:
    """
    Breaks the bounding box predictions into polyshapes which are easier to manage.
    """
    polyShapes = []
    for object in bounding_boxes['predictions']:
        shape = PolyShape(object['x'], object['y'], object['height'], object['class'], object['confidence'])
        for point in object['points']:
            shape.points.append(Point(int(point['x']), int(point['y'])))

        polyShapes.append(shape)

    return polyShapes

def check_line_intersection(line_points, polygon_points):
    """
    Checks if a parking line vector intersects a car polygon.
    """
    line = shapely.geometry.LineString(line_points)
    car = shapely.geometry.Polygon(polygon_points)
    return line.intersects(car)