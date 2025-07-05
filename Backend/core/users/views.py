from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializers  import UserSerializer



# Create your views here.
class LoginView(APIView):
    def post(self, request):
        try:
            username = request.data.get("username")
            password = request.data.get("password")

            if not username or not password:
                return Response(
                    {"error": "Username and password are required."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = authenticate(username=username, password=password)

            if user is None:
                return Response(
                    {"error": "Invalid credentials."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            refresh = RefreshToken.for_user(user)

            response = Response(
                {
                    "message": "Login successful",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                    },
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                }
            )

            response.set_cookie(
                key="access",
                value=str(refresh.access_token),
                httponly=True,
                samesite="Lax",
                # secure=True,  # Enable in production
            )
            response.set_cookie(
                key="refresh",
                value=str(refresh),
                httponly=True,
                samesite="Lax",
                # secure=True,
            )

            return response

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RefreshView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh")
        if not refresh_token:
            return Response({"error": "Refresh token missing"}, status=401)

        try:
            token = RefreshToken(refresh_token)
            access = str(token.access_token)

            response = Response({"access": access})
            response.set_cookie(
                key="access",
                value=access,
                httponly=True,
                samesite="Lax",
                secure=False,
            )
            return response
        except Exception:
            return Response({"error": "Invalid refresh token"}, status=401)


class LogoutView(APIView):

    def post(self, request):
        try:
            refresh_token = request.COOKIES.get("refresh")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
                response = Response(status=status.HTTP_205_RESET_CONTENT)
                response.delete_cookie("access")
                response.delete_cookie("refresh")
                return response
            else:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={"error": "Refresh token not provided."},
                )
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"error": str(e)})

class meView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            serializer = UserSerializer(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)