from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Client, Recruiter, Job, Candidate
from .serializers import ClientSerializer, RecruiterSerializer, JobSerializer, CandidateSerializer, MetricsSerializer
from .filters import CandidateFilter

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class RecruiterViewSet(viewsets.ModelViewSet):
    queryset = Recruiter.objects.all()
    serializer_class = RecruiterSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = CandidateFilter

    @action(detail=False, methods=['get'])
    def metrics(self, request):
        open_jobs = Job.objects.count()  # Count all jobs
        active_candidates = Candidate.objects.filter(status='active').count()
        disqualified_candidates = Candidate.objects.filter(status='disqualified').count()
        hired_candidates = Candidate.objects.filter(status='hired').count()

        metrics_data = {
            'open_jobs': open_jobs,
            'active_candidates': active_candidates,
            'disqualified_candidates': disqualified_candidates,
            'hired_candidates': hired_candidates
        }

        serializer = MetricsSerializer(metrics_data)
        return Response(serializer.data)