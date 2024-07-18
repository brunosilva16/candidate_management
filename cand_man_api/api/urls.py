from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet, RecruiterViewSet, JobViewSet, CandidateViewSet

router = DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'recruiters', RecruiterViewSet)
router.register(r'jobs', JobViewSet)
router.register(r'candidates', CandidateViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('candidates/metrics/', CandidateViewSet.as_view({'get': 'metrics'}), name='candidate-metrics'),
]
