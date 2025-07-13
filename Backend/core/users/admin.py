from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser

    # Add the custom field to the user detail page
    fieldsets = UserAdmin.fieldsets + (
        ("Custom Settings", {"fields": ("must_change_password",)}),
    )

    # Add the custom field to the user creation form
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Custom Settings", {
            "classes": ("wide",),
            "fields": ("must_change_password",),
        }),
    )

    # Optional: display the field in the user list view
    list_display = UserAdmin.list_display + ("must_change_password",)
