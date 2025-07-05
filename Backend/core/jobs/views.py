from django.shortcuts import render
from .models import Job
from rest_framework.viewsets import ModelViewSet
from .serializers import JobSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class JobViewSet(ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]
    

