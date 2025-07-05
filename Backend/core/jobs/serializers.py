from rest_framework import serializers
from utilities.models import Department, Designation, BusinessUnit
from .models import Job


class JobSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = Job
        fields = "__all__"
