from rest_framework.serializers import ModelSerializer
from .models import Designation, Department, BusinessUnit


class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class DesignationSerializer(ModelSerializer):
    class Meta:
        model = Designation
        fields = '__all__'

class BusinessUnitSerializer(ModelSerializer):
    class Meta:
        model = BusinessUnit
        fields = '__all__'