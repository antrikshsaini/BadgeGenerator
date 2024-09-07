from django.urls import path
from .views import (
    ListBadgesOrganiserView, LoginView, CreateUserView, UpdateUserView,
    ListOrganisersView, CreateBadgeView, ListBadgesView
)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('user/', CreateUserView.as_view(), name='create_user'),
    path('user/<int:pk>/', UpdateUserView.as_view(), name='update_user'),
    path('organisers/', ListOrganisersView.as_view(), name='list_organisers'),
    path('badge/', CreateBadgeView.as_view(), name='create_badge'),
    path('badges/organiser/', ListBadgesOrganiserView.as_view(), name='list_badges_by_organiser'),
    path('badges/', ListBadgesView.as_view(), name='list_badges'),
]

