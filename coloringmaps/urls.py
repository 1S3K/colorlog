"""coloringmaps URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

import maps.views

urlpatterns = [
    path('admin/', admin.site.urls),
	#이렇게 하면 coloringmaps.run.goorm.io/maps 쳤을 때 maps으로 연결되는거고
    #path('maps/', include('maps.urls')),
    #이렇게 하면 coloringmaps.run.goorm.io만 쳤을 때 바로 maps로 연결
    path('', include('maps.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
