class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.angle = 0
        self.vector = []
    
    def get_pos(self): 
        return [self.x, self.y]