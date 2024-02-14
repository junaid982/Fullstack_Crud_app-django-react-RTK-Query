from django.contrib import admin
from .models import EmpModel

# Register your models here.

@admin.register(EmpModel)
class EmpModelAdmin(admin.ModelAdmin):
    list_display = ['id' , 'emp_name' , 'emp_email' , 'emp_contact' , 'emp_desig' , 'emp_salary' , 'created_at' , 'updated_at']