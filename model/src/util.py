import shapely

def checkLineIntersection(line, polyPositionList):
    car_poly = shapely.geometry.Polygon(polyPositionList)
    lineI1 = shapely.geometry.LineString(line)

    doesIntersect = lineI1.intersects(car_poly)
    return doesIntersect
