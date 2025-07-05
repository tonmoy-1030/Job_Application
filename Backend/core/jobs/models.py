from django.db import models
from utilities.models import Designation, Department, BusinessUnit
from django.contrib.auth.models import User



# Create your models here.
class Job(models.Model):
    """
    Represents a job posting.
    Corresponds to the `Job` SQL table and links to Designation,
    Department, and BusinessUnit.
    """
    
    designation = models.ForeignKey(Designation, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    business_unit = models.ForeignKey(BusinessUnit, on_delete=models.SET_NULL, null=True)
    job_description = models.TextField(blank=True, null=True)
    job_type = models.CharField(max_length=50, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    date_posted = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    class Meta:
        db_table = "Job"

    def __str__(self):
        return f"{self.designation} ({self.job_type}) at {self.location}"
