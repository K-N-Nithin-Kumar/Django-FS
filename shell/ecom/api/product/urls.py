from rest_framework import routers
from django.urls import path,include
from . import views

router = routers.DefaultRouter()
router.register(r'',views.ProductViewSet)
urlpatterns = router.urls




#from rest_framework.authtoken import views 
urlpatterns = [
    path('', include(router.urls)),
]