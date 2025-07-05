from django.contrib import admin
from .models import Job


# Register your models here.
@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = (
        "designation",
        "job_type",
        "location",
        "department__department_name",
        "business_unit__unit_name",
        "is_active",
    )
    list_filter = ("job_type", "is_active")
    search_fields = ("designation", "location")
    date_hierarchy = "date_posted"
    ordering = ["-date_posted"]
