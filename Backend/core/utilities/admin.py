from django.contrib import admin
from .models import Designation, Department, BusinessUnit

# Register your models here.
@admin.register(Designation)
class DesignationAdmin(admin.ModelAdmin):
    list_display = ('designation',)

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('department_name',)

@admin.register(BusinessUnit)
class BusinessUnitAdmin(admin.ModelAdmin):
    list_display = ('unit_name', 'company')