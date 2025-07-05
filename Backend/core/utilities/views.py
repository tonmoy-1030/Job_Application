from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Department, Designation, BusinessUnit
from .serializers import (
    DepartmentSerializer,
    DesignationSerializer,
    BusinessUnitSerializer,
)


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]


class DesignationViewSet(viewsets.ModelViewSet):
    queryset = Designation.objects.all()
    serializer_class = DesignationSerializer
    permission_classes = [IsAuthenticated]


class BusinessUnitViewSet(viewsets.ModelViewSet):
    queryset = BusinessUnit.objects.all()
    serializer_class = BusinessUnitSerializer
    permission_classes = [IsAuthenticated]
