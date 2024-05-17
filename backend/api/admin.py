from django.contrib import admin
from .models import Note, Course, Po, Pso, Subject , Semester, Syllabus, CourseOutcome, CourseContent

# Register your models here.
admin.site.register(Note)
admin.site.register(Course)
admin.site.register(Po)
admin.site.register(Pso)
admin.site.register(Syllabus)
admin.site.register(Semester)
admin.site.register(Subject)
admin.site.register(CourseOutcome)
admin.site.register(CourseContent)
