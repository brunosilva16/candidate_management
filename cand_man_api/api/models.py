from django.db import models

class Client(models.Model):
    name = models.CharField(max_length=100)

class Recruiter(models.Model):
    name = models.CharField(max_length=100)

class Job(models.Model):
    title = models.CharField(max_length=100)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)  # Optional
    requirements = models.TextField(null=True, blank=True)  # Optional

class Candidate(models.Model):
    name = models.CharField(max_length=100)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    recruiter = models.ForeignKey(Recruiter, on_delete=models.CASCADE)
    status = models.CharField(max_length=50)  # e.g., active, disqualified, hired
    birth_date = models.DateField(null=True, blank=True)  # Optional
    years_of_experience = models.PositiveIntegerField(null=True, blank=True)  # Optional