from rest_framework import serializers
from .models import Client, Recruiter, Job, Candidate

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name']

class RecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruiter
        fields = ['id', 'name']

# Read serializer for Job
class JobReadSerializer(serializers.ModelSerializer):
    client = ClientSerializer()

    class Meta:
        model = Job
        fields = ['id', 'title', 'client', 'description', 'requirements']

# Write serializer for Job
class JobWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'client', 'description', 'requirements']

# Read serializer for Candidate
class CandidateReadSerializer(serializers.ModelSerializer):
    job = JobReadSerializer()
    recruiter = RecruiterSerializer()

    class Meta:
        model = Candidate
        fields = ['id', 'name', 'job', 'recruiter', 'status', 'birth_date', 'years_of_experience']

# Write serializer for Candidate
class CandidateWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ['id', 'name', 'job', 'recruiter', 'status', 'birth_date', 'years_of_experience']

class MetricsSerializer(serializers.Serializer):
    open_jobs = serializers.IntegerField()
    active_candidates = serializers.IntegerField()
    disqualified_candidates = serializers.IntegerField()
    hired_candidates = serializers.IntegerField()
