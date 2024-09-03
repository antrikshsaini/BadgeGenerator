from rest_framework import serializers
from .models import User, Badge

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'is_admin', 'is_organiser']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Password will be hashed in the model's save method
        return User.objects.create(**validated_data)

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ['id', 'html']
