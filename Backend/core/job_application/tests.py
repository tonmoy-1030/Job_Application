from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
import time

from .models import JobApplication
from jobs.models import Job
from utilities.models import BusinessUnit, Department


class JobApplicationModelTestCase(TestCase):
    """
    Test suite for the JobApplication model.
    """

    @classmethod
    def setUpTestData(cls):
        """
        Set up non-modified objects used by all test methods.
        This runs once for the entire test class.
        """
        # Create related objects needed for a Job.
        business_unit, _ = BusinessUnit.objects.get_or_create(unit_name="Technology")
        department, _ = Department.objects.get_or_create(
            department_name="Software Engineering"
        )
        cls.job = Job.objects.create(
            title="Software Engineer",
            business_unit=business_unit,
            department=department,
            job_description="Develop amazing software.",
        )

        # Create a dummy file for the resume for job_application1.
        resume_content1 = b"This is a dummy resume file."
        cls.resume_file1 = SimpleUploadedFile(
            "resume1.pdf", resume_content1, content_type="application/pdf"
        )

        # Create a JobApplication instance for job_application1.
        cls.job_application1 = JobApplication.objects.create(
            job=cls.job,
            candidate_name="John Doe",
            email="john.doe@example.com",
            resume=cls.resume_file1,
        )
        # Sleep to ensure a different application_date for ordering tests.
        time.sleep(0.01)

        # Create a dummy file for the resume for job_application2.
        resume_content2 = b"This is another dummy resume file."
        cls.resume_file2 = SimpleUploadedFile(
            "resume2.pdf", resume_content2, content_type="application/pdf"
        )

        cls.job_application2 = JobApplication.objects.create(
            job=cls.job,
            candidate_name="Jane Smith",
            email="jane.smith@example.com",
            resume=cls.resume_file2,
        )

    def test_job_application_creation(self):
        """Test that a JobApplication instance is created correctly."""
        self.assertIsInstance(self.job_application1, JobApplication)
        self.assertEqual(self.job_application1.candidate_name, "John Doe")
        self.assertEqual(self.job_application1.job, self.job)
        self.assertEqual(self.job_application1.email, "john.doe@example.com")

    def test_default_status(self):
        """Test that the default status for a new application is 'Submitted'."""
        self.assertEqual(self.job_application1.status, JobApplication.SUBMITTED)

    def test_str_representation(self):
        """Test the __str__ method of the JobApplication model."""
        expected_str = (
            f"Application from {self.job_application1.candidate_name} for {self.job}"
        )
        self.assertEqual(str(self.job_application1), expected_str)

    def test_ordering(self):
        """Test that applications are ordered by application_date descending."""
        applications = JobApplication.objects.all()
        # The most recently created application should be first.
        self.assertEqual(applications[0], self.job_application2)
        self.assertEqual(applications[1], self.job_application1)

    def test_resume_upload_path(self):
        """Test that the resume is uploaded to the correct path."""
        self.assertTrue(self.job_application1.resume.name.startswith("resumes/"))

    def tearDown(self):
        """Clean up created files after each test."""
        # This is important for FileField tests to avoid leaving files behind.
        for app in JobApplication.objects.all():
            if app.resume:
                # This will delete the file from the storage.
                app.resume.delete(save=False)
        super().tearDown()
