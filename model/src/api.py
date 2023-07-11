from roboflow import Roboflow

api_key = 'ZFgVoiLIPSH5f3sOCidN'

def load_model():
    """
    Calls Roboflow to retrieve the model suitable for this project.
    """
    project = Roboflow(api_key).workspace().project('parking-violations-lxf0d')
    return project.version(2).model