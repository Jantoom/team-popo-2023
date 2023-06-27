import violation.routes.violation_list_routes
import violation.routes.violation_routes
from violation import api

@api.route('/health', methods=['GET'])
def health_check():
    """Query the health of the asset service."""
    return 'Service is healthy.', 200