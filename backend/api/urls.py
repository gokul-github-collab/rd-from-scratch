from django.urls import path
from . import views


urlpatterns = [
    path("notes/", views.NoteListCreateView.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="note-delete"),    
    path('check_superuser/', views.CheckSuperUser.as_view(), name='check_superuser'),
    path('courses/', views.CoureListView.as_view(), name='courses'),
    path("courses/<int:pk>/", views.CourseDetailView.as_view(), name='course-detail'),
    path("courses/delete/<int:pk>/", views.CourseDelete.as_view(), name="course-delete"),  
    path("pos/", views.PoCreateListView.as_view(), name="po-list"),
    path("psos/", views.PsoCreateListView.as_view(), name="pso-list"),

]