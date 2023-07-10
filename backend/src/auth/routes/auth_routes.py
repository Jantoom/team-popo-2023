from flask import jsonify
from flask_jwt_extended import jwt_required
from src.core.util import parameters, unknown_error
from src.auth import api
from src.auth.services import auth_service
from src.auth.schemas import SignupUserRequest, SignupUserResponse, \
    LoginUserRequest, LoginUserResponse, LogoutUserRequest, LogoutUserResponse

@api.route('/signup', methods=['POST'])
def signup_user():
    """Signs up a new user."""
    try:
        input = SignupUserRequest().load(parameters())
        user = auth_service.signup_user(input)
        return jsonify(
            message='Successfully created user.',
            user=SignupUserResponse().dump(user)
        ), 201
    except Exception as e:    
        return unknown_error(e)

@api.route('/login', methods=['POST'])
def login_user():
    """Logs in a user."""
    try:
        input = LoginUserRequest().load(parameters())
        user = auth_service.login_user(input)
        return jsonify(
            message='Successfully logged in user.',
            user=LoginUserResponse().dump(user)
        ), 200
        return 'Username or password is invalid', 404
    except Exception as e:
        return unknown_error(e)

@api.route('/logout', methods=['GET'])
@jwt_required()
def logout_user():
    """Logs out a user."""
    try:
        input = LogoutUserRequest().load(parameters())
        user = auth_service.logout_user(input)
        return jsonify(
            message='Successfully logged out user',
            user=LogoutUserResponse().dump(user)
        ), 200
    except Exception as e:
        return unknown_error(e)
