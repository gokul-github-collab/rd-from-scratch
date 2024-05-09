from django.contrib import admin
from .models import Note, Course, Po, Pso, Semester

# Register your models here.
admin.site.register(Note)
admin.site.register(Course)
admin.site.register(Po)
admin.site.register(Pso)
admin.site.register(Semester)