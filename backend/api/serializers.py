from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Course, Po, Pso, Semester


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]

        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
        

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]

        extra_kwargs = {"author": {"read_only": True}}

class PoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Po
        fields = ('id', 'title', 'description')

class CourseSerializer(serializers.ModelSerializer):
    pos = PoSerializer(many=True, read_only=True)  

    class Meta:
        model = Course
        fields = ('id', 'name', 'type', 'description', 'location', 'tuition_fee', 'pos')

