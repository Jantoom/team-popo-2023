from roboflow import Roboflow

API_KEY = "ZFgVoiLIPSH5f3sOCidN"
PROJECT_NAME = "parking-violations-lxf0d"
PROJECT_VERSION = 2

loadedAPI = False
model = None
def loadAPI():
    global loadedAPI, model

    # load API
    if not(loadedAPI):
        rf = Roboflow(api_key=API_KEY)
        project = rf.workspace().project(PROJECT_NAME)
        model = project.version(PROJECT_VERSION).model
        loadedAPI = True

    return model