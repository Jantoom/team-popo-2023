import cv2

from geometry import *
from api import *
from draw import *
from util import *

def getAiData(file):
    useAPI = False
    # If loading image then use API, else read from txt file.
    if (('png', 'jpg', 'jpeg', 'tiff', 'bmp', 'gif').__contains__(file.split(".")[-1])):
        useAPI = True

    if useAPI:
        model = loadAPI()
        aiData = model.predict(file).json()
    else:
        # Text file should contain JSON data of roboflow output
        file1 = open(file, "r")
        aiData = eval(file1.read())
        file1.close()

    return aiData

def start(file, showImage=False):
    # Get Masked Polygon Data From RoboFlow
    aiData = getAiData(file)
    # Create PolyShapes from points
    polyShapes = createPolyShapes(aiData)     

    # An array of booleans. Each boolean repesents if a parking line intersected with a car. Checks each line with each car.
    results = []
    averageLines = []

    for shape in getPolyShapeFromClass("lines", polyShapes):
        # Create Vectors from Point to Point in Polygon
        shape.createVectors()
        # Calculate and group all of the similar angled vectors within plus or minus range
        # Angle range used to group similar angled vectors
        angleRange = 40
        shape.groupSimilarVectors(angleRange)
        
        # Gets the Average Line of Longest sides of Parking Line
        averageLine = shape.getAverageLine(shape.height)
        averageLines.append(averageLine)

        
        for carShape in getPolyShapeFromClass("car", polyShapes):
            doesIntersect = checkLineIntersection(averageLine, carShape.getPositionList())
            results.append(doesIntersect)
    
    if showImage:
        drawImage(polyShapes, averageLines, file)
    
    # Returns true if any line intersects with any car
    for result in results:
        if result:
            return result
    return False
