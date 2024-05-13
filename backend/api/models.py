from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True, null=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')


    def __str__(self) -> str:
        return self.title
    
class Course(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    description = models.TextField()
    location = models.CharField(max_length=100)
    tuition_fee = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Semester(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='semesters')
    subject1 = models.CharField(max_length=100, blank=True, null=True)
    subject2 = models.CharField(max_length=100, blank=True, null=True)
    subject3 = models.CharField(max_length=100, blank=True, null=True)
    subject4 = models.CharField(max_length=100, blank=True, null=True)
    subject5 = models.CharField(max_length=100, blank=True, null=True)
    subject6 = models.CharField(max_length=100, blank=True, null=True)
    subject7 = models.CharField(max_length=100, blank=True, null=True)



class Po(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='pos')

class Pso(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='psos')

