from rest_framework.serializers import ModelSerializer
from .models import JobApplication


class JobApplicationSerializer(ModelSerializer):
    class Meta:
        model = JobApplication
        fields = '__all__'