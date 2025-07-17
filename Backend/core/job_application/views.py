from django.shortcuts import render
from .serializers import JobApplicationSerializer
from rest_framework.viewsets import ModelViewSet
from .models import JobApplication
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class JobApplicationViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = JobApplicationSerializer
    queryset = JobApplication.objects.all()
    
    # def get_queryset(self, request):
    #     queryset = super().get_queryset(request)
    #     jobs = request.GET.get("jobs", None)
    #     if jobs:
    #         return queryset.filter(job__id=jobs)
    #     return queryset