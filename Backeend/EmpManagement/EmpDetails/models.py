from django.db import models

# Create your models here.

class EmpModel(models.Model):
    emp_name = models.CharField(max_length = 255)
    emp_email = models.CharField(max_length = 255)
    emp_contact = models.CharField(max_length = 255)
    emp_desig = models.CharField(max_length = 255)
    emp_salary = models.FloatField()

    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
