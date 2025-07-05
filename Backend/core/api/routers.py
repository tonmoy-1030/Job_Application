from rest_framework.routers import DefaultRouter
from utilities.views import DepartmentViewSet, DesignationViewSet, BusinessUnitViewSet
from jobs.views import JobViewSet
from job_application.views import JobApplicationViewSet




router = DefaultRouter()
router.register(r"departments", DepartmentViewSet, basename="departments")
router.register(r"designations", DesignationViewSet, basename="designations")
router.register(r"business-units", BusinessUnitViewSet, basename="business-units")
router.register(r"jobs", JobViewSet, basename="jobs")
router.register(r"job-applications", JobApplicationViewSet, basename="job-applications")



