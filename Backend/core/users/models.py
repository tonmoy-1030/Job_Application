from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    must_change_password = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.username}"