from django.db import models

# Create your models here.
class Designation(models.Model):
    """
    Represents a job title or designation within the organization.
    Corresponds to the `Designation` SQL table.
    """
    designation = models.CharField(max_length=255)

    class Meta:
        db_table = 'Designation' # Ensures the table name matches the SQL schema

    def __str__(self):
        return self.designation

class Department(models.Model):
    """
    Represents a department within the organization.
    Corresponds to the `Department` SQL table.
    """
    department_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'Department'

    def __str__(self):
        return self.department_name

class BusinessUnit(models.Model):
    """
    Represents a business unit, which could be a team or a subdivision.
    Corresponds to the `business_unit` SQL table.
    """
    unit_name = models.CharField(max_length=255)
    company = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Business Units"
        db_table = 'business_unit'

    def __str__(self):
        return self.unit_name