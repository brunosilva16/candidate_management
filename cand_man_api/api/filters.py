from django_filters import rest_framework as filters
from .models import Candidate

class CandidateFilter(filters.FilterSet):
    job = filters.NumberFilter(field_name="job__id")
    client = filters.NumberFilter(field_name="job__client")
    status = filters.CharFilter(field_name="status")
    recruiter = filters.NumberFilter(field_name="recruiter__id")

    class Meta:
        model = Candidate
        fields = ['job', 'status', 'recruiter', 'client']
