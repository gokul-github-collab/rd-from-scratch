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
    
class Syllabus(models.Model):
    year = models.CharField(max_length=100)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='syllabus')
    

    def __str__(self) -> str:
        return self.year
    

class Semester(models.Model):
    title = models.CharField(max_length=100, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='semesters')
    syllabus  = models.ForeignKey(Syllabus, on_delete=models.CASCADE, related_name='sem')

    def __str__(self) -> str:
        return self.title + " - " + self.course.name
    
    

class Subject(models.Model):
    name = models.CharField(max_length=200)
    course_code = models.CharField(max_length=100, unique=True)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='subjects')
    ltpc = models.CharField(max_length=50, blank=True, null=True)
    prerequisite = models.CharField(max_length=300, blank=True, null=True)
    external_mark = models.IntegerField(blank=True, null=True)
    internal_mark = models.IntegerField(blank=True, null=True)

    def __str__(self) -> str:
        return self.name + " - " + self.semester.title + " - " + self.semester.syllabus.year
    

class CourseOutcome(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    uap = models.CharField(max_length=100)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="co")
    def __str__(self) -> str:
        return self.title 
    
class CourseContent(models.Model):
    module = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    description = models.TextField()
    hrs_pw = models.IntegerField()
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="cc")


    def __str__(self) -> str:
        return self.title + " - " + self.subject.name
    


class Po(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='pos')

    def __str__(self) -> str:
        return self.title + " - " + self.course.name
    

class Pso(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='psos')

    def __str__(self) -> str:
        return self.title + " - " + self.course.name