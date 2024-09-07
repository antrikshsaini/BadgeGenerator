from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView
from .models import User, Badge
from .serializers import UserSerializer, BadgeSerializer

# POST /login
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                return Response({'message': 'Login successful', 'user_id': user.id, 'is_admin': user.is_admin,
                                 'is_organiser': user.is_organiser})
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

# POST /user
class CreateUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# PATCH /user
class UpdateUserView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# GET /organisers
class ListOrganisersView(ListAPIView):
    queryset = User.objects.filter(is_organiser=True)
    serializer_class = UserSerializer

# POST /badge
class CreateBadgeView(CreateAPIView):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer

    def perform_create(self, serializer):
        user = User.objects.get(id=self.request.data.get('organiser_id'))
        if not user.is_organiser:
            raise PermissionDenied('Only organisers can create badges.')
        serializer.save(user=user)

# GET /list badges by organiser
class ListBadgesOrganiserView(ListAPIView):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer

    def get_queryset(self):
        user = self.request.query_params.get('organiser_id')
        if user:
            return Badge.objects.filter(user=user)
        return Badge.objects.none() 

# GET /list all badges
class ListBadgesView(ListAPIView):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
