from django.contrib import admin
from .models import JobApplication

# Register your models here.
@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('job__designation', 'candidate_name', 'status', 'application_date')
    search_fields = ('candidate_name', 'job__business_unit__name')
    