from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.urls import path
from . import views
#from . views import CoverPageView

urlpatterns = [
	# 메인페이지(세션으로 로그인 유무 판단 확인)
	path('', views.home, name="home"),
	# 회원가입, 로그인, 로그아웃 처리
	path('signup/', views.signup, name='signup'),
	path('login/', views.login, name='login'),
	path('logout/', views.logout, name='logout'),
	# 글쓰기
	path('write/', views.write, name='write'),
	# 마이페이지
	path('withdrawal', views.withdrawal, name='withdrawal'),
	path('modifyemail', views.modifyemail, name='modifyemail'),
	path('modifynickname', views.modifynickname, name='modifynickname'),
	# 게시글 지역별 필터링
	path('region/<int:story_region>', views.filtering, name='filtering'),
	# 게시글 더보기
	path('region/story/<int:story_id>', views.detail, name='detail'),
	# 게시글 수정,삭제
	path('region/story/<int:story_id>/modify', views.modifystory, name='modifystory'),
	path('region/story/<int:story_id>/delete', views.deletestory, name='deletestory'),
	# 테스트
	path('test/', views.test, name='test'),
	
]


"""
#원래 했던 거
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    # /maps/
    path('', views.Index, name='index'),
    
    # /maps/main
    path('main/', views.Main, name='main'),
    
]
"""




