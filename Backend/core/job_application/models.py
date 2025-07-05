from django.db import models
from jobs.models import Job

# Create your models here.
class JobApplication(models.Model):
    """
    Represents a single application submitted by a candidate for a job.
    Corresponds to the `Job_Application` SQL table.
    """
    SUBMITTED = 'Submitted'
    IN_REVIEW = 'In Review'
    INTERVIEWING = 'Interviewing'
    REJECTED = 'Rejected'
    HIRED = 'Hired'
    STATUS_CHOICES = [
        (SUBMITTED, 'Submitted'),
        (IN_REVIEW, 'In Review'),
        (INTERVIEWING, 'Interviewing'),
        (REJECTED, 'Rejected'),
        (HIRED, 'Hired'),
    ]

    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    candidate_name = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField()
    application_date = models.DateTimeField(auto_now_add=True)
    resume = models.FileField(upload_to='resumes/', )
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default=SUBMITTED
    )

    class Meta:
        db_table = 'Job_Application'
        ordering = ['-application_date']

    def __str__(self):
        return f"Application from {self.candidate_name} for {self.job}"