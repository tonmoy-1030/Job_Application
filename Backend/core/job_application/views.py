from django.shortcuts import render
from .serializers import JobApplicationSerializer
from rest_framework.viewsets import ModelViewSet
from .models import JobApplication


# Create your views here.
class JobApplicationViewSet(ModelViewSet):
    serializer_class = JobApplicationSerializer
    queryset = JobApplication.objects.all()
