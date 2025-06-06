
from rest_framework import serializers
from .models import Quizz,Question,Answer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class QuizzSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quizz
        fields = ['id', 'creator', 'title', 'created_at']
        read_only_fields = ['id', 'creator', 'created_at']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'quizz', 'text', 'created_at']

class AnswerSerializer(serializers.ModelSerializer):
    selected_by = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Answer
        fields = ['id', 'question', 'is_correct', 'text', 'selected_by', 'created_at']
