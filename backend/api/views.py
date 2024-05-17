from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, NoteSerializer, CourseSerializer, PoSerializer, PsoSerializer,SyllabusSerializer, SemesterSerializer, SubjectSerializer, CourseContentSerializer, CourseOutcomeSerializer
from .serializers import TextBookSerializer, ReferenceBookSerializer, WebReferenceSerializer, OnlineReferenceSerializer
from django.contrib.auth.models import User
from rest_framework import response
from .models import Note, Course, Po, Pso, Semester, Subject, Syllabus, CourseOutcome, CourseContent, TextBook, ReferenceBook, WebReference, OnlineReference
from rest_framework import status
from rest_framework.views import APIView

class CheckSuperUser(APIView):
    def get(self, request, *args, **kwargs):
        if request.user.is_superuser:
            return response.Response({"is_superuser": True}, status=status.HTTP_200_OK)
        else:
            return response.Response({"is_superuser": False}, status=status.HTTP_200_OK)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        user = self.request.user

        return Note.objects.filter(author=user)


    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class CoureListView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]

class CourseDelete(generics.DestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

class PoCreateListView(generics.ListCreateAPIView):
    queryset = Po.objects.all()
    serializer_class = PoSerializer
    permission_classes = [IsAuthenticated]

class PoDetail(generics.RetrieveUpdateAPIView):
    queryset = Po.objects.all()
    serializer_class = PoSerializer
    permission_classes = [AllowAny]

class PoDelete(generics.DestroyAPIView):
    queryset = Po.objects.all()
    serializer_class = PoSerializer
    permission_classes = [IsAuthenticated]

class PsoCreateListView(generics.ListCreateAPIView):
    queryset = Pso.objects.all()
    serializer_class = PsoSerializer
    permission_classes = [AllowAny]

class PsoDetail(generics.RetrieveUpdateAPIView):
    queryset = Pso.objects.all()
    serializer_class = PsoSerializer
    permission_classes = [IsAuthenticated]

class PsoDelete(generics.DestroyAPIView):
    queryset = Pso.objects.all()
    serializer_class = PsoSerializer
    permission_classes = [IsAuthenticated]



class SyllabusListView(generics.ListCreateAPIView):
    queryset = Syllabus.objects.all()
    serializer_class = SyllabusSerializer
    permission_classes = [AllowAny]


class SyllabusDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Syllabus.objects.all()
    serializer_class = SyllabusSerializer
    permission_classes = [AllowAny]
    

class SemesterListView(generics.ListCreateAPIView):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    permission_classes = [AllowAny]




class SemesterDelete(generics.DestroyAPIView):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    permission_classes = [IsAuthenticated]



class SemesterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    permission_classes = [AllowAny]

class SubjectListView(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [AllowAny]


class SubjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [AllowAny]



class SubjectsBySemesterView(generics.ListCreateAPIView):
    serializer_class = SubjectSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        semester_id = self.kwargs.get('semester_id')
        # Retrieve the semester instance
        semester = Semester.objects.get(id=semester_id)
        # Retrieve subjects related to the semester
        subjects = Subject.objects.filter(semester=semester)
        return subjects
    
class CourseOutcomeListView(generics.ListCreateAPIView):
    queryset = CourseOutcome.objects.all()
    serializer_class = CourseOutcomeSerializer
    permission_classes = [AllowAny]


class CourseOutcomeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseOutcome.objects.all()
    serializer_class = CourseOutcomeSerializer
    permission_classes = [AllowAny]

class CourseOutcomeDeleteView(generics.DestroyAPIView):
    queryset = CourseOutcome.objects.all()
    serializer_class = CourseOutcomeSerializer
    permission_classes = [AllowAny]


class CourseContentListView(generics.ListCreateAPIView):
    queryset = CourseContent.objects.all()
    serializer_class = CourseContentSerializer
    permission_classes = [AllowAny]

class CourseContentDetailView(generics.RetrieveUpdateAPIView):
    queryset = CourseContent.objects.all()
    serializer_class = CourseContentSerializer
    permission_classes = [AllowAny]


class CourseContentDeleteView(generics.DestroyAPIView):
    queryset = CourseContent.objects.all()
    serializer_class = CourseContentSerializer
    permission_classes = [AllowAny]



class TextBookListView(generics.ListCreateAPIView):
    queryset = TextBook.objects.all()
    serializer_class = TextBookSerializer
    permission_classes = [AllowAny]

class TextBookDetailView(generics.RetrieveUpdateAPIView):
    queryset = TextBook.objects.all()
    serializer_class = TextBookSerializer
    permission_classes = [AllowAny]


class TextBookDeleteView(generics.DestroyAPIView):
    queryset = TextBook.objects.all()
    serializer_class = TextBookSerializer
    permission_classes = [AllowAny]


class ReferenceBookListView(generics.ListCreateAPIView):
    queryset = ReferenceBook.objects.all()
    serializer_class = ReferenceBookSerializer
    permission_classes = [AllowAny]

class ReferenceBookDetailView(generics.RetrieveUpdateAPIView):
    queryset = ReferenceBook.objects.all()
    serializer_class = ReferenceBookSerializer
    permission_classes = [AllowAny]


class ReferenceBookDeleteView(generics.DestroyAPIView):
    queryset = ReferenceBook.objects.all()
    serializer_class = ReferenceBookSerializer
    permission_classes = [AllowAny]


class WebReferenceListView(generics.ListCreateAPIView):
    queryset = WebReference.objects.all()
    serializer_class = WebReferenceSerializer
    permission_classes = [AllowAny]

class WebReferenceDetailView(generics.RetrieveUpdateAPIView):
    queryset = WebReference.objects.all()
    serializer_class = WebReferenceSerializer
    permission_classes = [AllowAny]


class WebReferenceDeleteView(generics.DestroyAPIView):
    queryset = WebReference.objects.all()
    serializer_class = WebReferenceSerializer

    permission_classes = [AllowAny]


class OnlineReferenceListView(generics.ListCreateAPIView):
    queryset = OnlineReference.objects.all()
    serializer_class = OnlineReferenceSerializer
    permission_classes = [AllowAny]

class OnlineReferenceDetailView(generics.RetrieveUpdateAPIView):
    queryset = OnlineReference.objects.all()
    serializer_class = OnlineReferenceSerializer
    permission_classes = [AllowAny]


class OnlineReferenceDeleteView(generics.DestroyAPIView):
    queryset = OnlineReference.objects.all()
    serializer_class = OnlineReferenceSerializer
    permission_classes = [AllowAny]