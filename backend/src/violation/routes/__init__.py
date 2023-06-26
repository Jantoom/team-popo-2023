import src.violation.routes.violation_list_routes
import src.violation.routes.violation_routes
from src.violation import api

@api.route('/health', methods=['GET'])
def health_check():
    """Query the health of the asset service."""
    return 'Service is healthy.', 200