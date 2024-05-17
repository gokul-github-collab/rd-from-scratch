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
    path("pos/<int:pk>/", views.PoDetail.as_view(), name="po"),
    path("pos/delete/<int:pk>/", views.PoDelete.as_view(), name="po-delete"),

    path("psos/", views.PsoCreateListView.as_view(), name="pso-list"),
    path("psos/<int:pk>/", views.PsoDetail.as_view(), name="pso"),
    path("psos/delete/<int:pk>/", views.PsoDelete.as_view(), name="pso-delete"),

    path("syllabus/", views.SyllabusListView.as_view(), name='syllabus-list'),
    path("syllabus/<int:pk>/", views.SyllabusDetailView.as_view(), name='syllabus-detail'), 


    path("semester/", views.SemesterListView.as_view(), name='semester-list'),
    path("semester/<int:pk>/", views.SemesterDetailView.as_view(), name='semester-detail'), 
    path("semester/delete/<int:pk>/", views.SemesterDelete.as_view(), name='semester-delete'), 



     path('semester/<int:semester_id>/subjects/', views.SubjectsBySemesterView.as_view(), name='subjects-by-semester'),

    path("subject/", views.SubjectListView.as_view(), name='subject-list'),
    path("subject/<int:pk>/", views.SubjectDetailView.as_view(), name='subject-detail'), 


    path("course-outcome/", views.CourseOutcomeListView.as_view(), name='course-outcome-list'),
    path("course-outcome/<int:pk>/", views.CourseOutcomeDetailView.as_view(), name='course-outcome-detail'),
    path("course-outcome/delete/<int:pk>/", views.CourseOutcomeDeleteView.as_view(), name='course-outcome-delete'),


    path("course-content/", views.CourseContentListView.as_view(), name='course-content-list'),
    path("course-content/<int:pk>/", views.CourseContentDetailView.as_view(), name='course-content-detail'),
    path("course-content/delete/<int:pk>/", views.CourseContentDeleteView.as_view(), name='course-content-delete'),

]