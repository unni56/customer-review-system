from fastapi.routing import APIRoute
from main import app

def list_routes():
    routes = [route.path for route in app.routes if isinstance(route, APIRoute)]
    print("\n".join(routes))

list_routes()