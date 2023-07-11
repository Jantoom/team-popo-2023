from src.util import load_object_predictions, create_polyshapes, filter_polyshapes_by_classification, check_line_intersection

def start(file_path, showImage=False):
    # Get Masked Polygon Data From RoboFlow
    predictions = load_object_predictions(file_path)
    # Create PolyShapes from points
    polyshapes = create_polyshapes(predictions)     

    # An array of booleans. Each boolean repesents if a parking line intersected with a car. Checks each line with each car.
    results = []

    for shape in filter_polyshapes_by_classification('lines', polyshapes):
        # Create Vectors from Point to Point in Polygon
        shape.create_vectors()
        # Calculate and group all of the similar angled vectors within plus or minus range
        # Angle range used to group similar angled vectors
        angleRange = 40
        shape.group_similar_vectors(angleRange)

        # Gets the Average Line of Longest sides of Parking Line
        averageLine = shape.get_average_line(shape.height)

        for carShape in filter_polyshapes_by_classification("car", polyshapes):
            doesIntersect = check_line_intersection(averageLine, carShape.get_position_list())
            results.append(doesIntersect)
        
    if showImage:
        from src.draw import draw_image
        draw_image(polyshapes, averageLine[0], averageLine[1])
    
    # Returns true if any line intersects with any car
    return any(results)

print(start('data.txt', showImage=False))