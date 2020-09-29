from django.views.decorators.csrf import csrf_protect
from django.views.generic.base import TemplateView #GenericView base 중 TemplateView 사용
from django.views.generic import CreateView
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from .models import Profile, Story, Region #적용할 모델들
from django.contrib import auth
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.http import HttpResponse
from .forms import StoryForm
import re, random

# 테스트용
def test(request):
	title = request.GET['title']
	text = request.GET['content']
	spot = request.GET['spot']
	story = Story(title=title, text=text, spot=spot)
	#story.author = request.seesion.get('user')
	story.save()
	return redirect('/')

def home(request):
	#return render(request, "maps/test.html")
	user_session = request.session.get('user')
	if user_session:
		stories = Story.objects.filter(author=user_session).order_by('-begin_date')
		region_list = Region.objects.filter(author=user_session).values('area', 'color')
		
		areas=[] # 지역 리스트
		colors=[] # 색상 리스트
		
		for i in region_list:
			areas.append(i.get('area'))
			colors.append(i.get('color'))
		
		regions = dict(zip(areas, colors)) # 두 리스트를 하나는 key값, 다른 하나는 value값으로 해서 딕셔너리 생성
		
		content = {'stories':stories, 'regions':regions}
		
		return render(request, 'maps/main.html', content)
	else:
		return render(request, 'maps/new_cover.html')

#회원가입
def signup(request):
	if request.method == "POST":
		input_id = request.POST['id']
		input_email = request.POST['email']
		input_pw = request.POST['pw']
		input_nickname = request.POST['nickname']
		compare_id = re.sub('[^0-9a-zA-z]','',input_id)
		if (input_id != compare_id) or (len(input_id) < 6 or len(input_id) >15):
			return render(request, 'maps/new_cover.html', {'id_error': True})
		elif User.objects.filter(username=input_id).exists():
			return render(request, 'maps/new_cover.html', {'id_duplication':True})
		elif len(input_email) < 1:
			return render(request, 'maps/new_cover.html', {'email_error':True})
		elif len(input_nickname) < 1 or len(input_nickname) > 20:
			return render(request, 'maps/new_cover.html', {'nick_error':True})
		elif len(input_pw) < 6 or len(input_pw) > 20:
			return render(request, 'maps/new_cover.html', {'pw_error':True})
		elif input_pw != request.POST['pw_check']:
			return render(request, 'maps/new_cover.html', {'pwcheck_error':True})
		else:
			user = User.objects.create_user(
				username = input_id,
				password = input_pw)
			nickname = input_nickname
			profile = Profile(user=user, nickname=nickname)
			profile.save()
			return render(request, 'maps/new_cover.html', {'perfect':True})
	return render(request, 'maps/new_cover.html')

#로그인
def login(request):
	if request.method == "POST":
		userid = request.POST['id']
		userpw = request.POST['pw']
		user = auth.authenticate(request, username=userid, password=userpw)
		if user:
			auth.login(request, user=user)
			request.session['user'] = userid
			return redirect('/')
		else:
			return render(request, 'maps/new_cover.html', {'login_error':True})
	else:
		return render(request, 'maps/new_cover.html')

#로그아웃
def logout(request):
	userid = request.session['user']
	user_instance = User.objects.get(username=userid)
	user_instance.profile.reg = "reg"
	user_instance.save()
	auth.logout(request)
	return render(request, 'maps/new_cover.html')
		
#마이페이지
def modifyemail(request):
	if request.method == "POST":
		email_ori = request.POST['email1']
		email_cha = request.POST.get('email2', '')
		if len(email_ori)==0 or len(email_cha)==0:
			return render(request, 'maps/main.html', {'email_empty':True})
		else:
			userid = request.session['user']
			user_instance = User.objects.get(username=userid)
			if user_instance.email == email_ori:
				user_instance.email = email_cha
				user_instance.save()
			else:
				return render(request, 'maps/main.html', {'email_incorrect':True})
	return redirect('/')

def modifynickname(request):
	if request.method == "POST":
		nick1 = request.POST['nick1']
		nick2 = request.POST['nick2']
		if len(nick1)==0 or len(nick2)==0:
			return render(request, 'maps/main.html', {'nickname_empty':True})
		else:
			userid = request.session['user']
			user_instance = User.objects.get(username=userid)
			profile_instance = Profile.objects.get(user=user_instance)
			if profile_instance.nickname == nick1:
				profile_instance.nickname = nick2
				profile_instance.save()
			else:
				return render(request, 'maps/main.html', {'nickname_incorrect':True})
	return redirect('/')

def withdrawal(request):
	if request.method == "POST":
		request.user.delete()
		auth.logout(request)
	return redirect('/')

# 게시글 지역별 필터링
def filtering(request, story_region):
	user_session = request.session.get('user')
	if user_session:
		str_region = str(story_region)
		stories = Story.objects.filter(author=user_session, region=str_region).order_by('-begin_date')
		region_list = Region.objects.filter(author=user_session).values('area', 'color')
		
		areas=[] # 지역 리스트
		colors=[] # 색상 리스트
		
		for i in region_list:
			areas.append(i.get('area'))
			colors.append(i.get('color'))
		
		regions = dict(zip(areas, colors)) # 두 리스트를 하나는 key값, 다른 하나는 value값으로 해서 딕셔너리 생성
		
		dic = {
    		'20':'서울 강동구',
    		'21':'서울 송파구',
    		'22':'서울 광진구',
    		'23':'서울 중랑구',
    		'24':'서울 노원구',
			'25':'서울 강남구',
			'26':'서울 성동구',
			'27':'서울 동대문구',
			'28':'서울 성북구',
			'29':'서울 강북구',
			'210':'서울 도봉구',
			'211':'서울 서초구',
			'212':'서울 용산구',
			'213':'서울 중구',
			'214':'서울 종로구',
			'215':'서울 은평구',
			'216':'서울 서대문구',
			'217':'서울 마포구',
			'218':'서울 강서구',
			'219':'서울 양천구',
			'220':'서울 구로구',
			'221':'서울 금천구',
			'222':'서울 관악구',
			'223':'서울 동작구',
			'224':'서울 영등포구',
			# 인천
			'320':'인천 강화군',
			'321':'인천 계양구',
			'322':'인천 부평구',
			'323':'인천 서구',
			'324':'인천 연수구',
			'325':'인천 남구',
			'326':'인천 남동구',
			'327':'인천 동구',
			'328':'인천 중구', #인천_중구
			'329':'인천 옹진군',
			# 경기
			'310':'김포시',
			'311':'고양시',
			'312':'파주시',
			'313':'양주시',
			'314':'의정부시',
			'315':'동두천시',
			'316':'연천군',
			'317':'포천시',
			'318':'구리시',
			'319':'남양주시',
			'3110':'하남시',
			'3111':'양평군',
			'3112':'가평군',
			'3113':'여주군',
			'3114':'광주시',
			'3115':'성남시',
			'3116':'과천시',
			'3117':'의왕시',
			'3118':'용인시',
			'3119':'안양시',
			'3120':'부천시',
			'3121':'광명시',
			'3122':'시흥시',
			'3123':'이천시',
			'3124':'수원시',
			'3125':'군포시',
			'3126':'안산시',
			'3127':'오산시',
			'3128':'평택시',
			'3129':'안성시',
			'3130':'화성시',
			# 강원
			'330':'철원군',
			'331':'화천군',
			'332':'춘천시',
			'333':'홍천군',
			'334':'횡성군',
			'335':'원주시',
			'336':'양구군',
			'337':'인제군',
			'338':'고성군',
			'339':'속초시',
			'3310':'양양군',
			'3311':'평창군',
			'3312':'강릉시',
			'3313':'정선군',
			'3314':'동해시',
			'3315':'영월군',
			'3316':'태백시',
			'3317':'삼척시',
			# 충북
			'430':'진천군',
			'431':'음성군',
			'432':'충주시',
			'433':'제천시',
			'434':'단양군',
			'435':'괴산군',
			'436':'증평군',
			'437':'청주시',
			'438':'보은군',
			'439':'옥천군',
			'4310':'영동군',
			# 대전
			'420':'대전 유성구',
			'421':'대전 서구', # 서구_3_
			'422':'대전 중구', # 중구_5_
			'423':'대전 대덕구',
			'424':'대전 동구', # 동구_4_
			# 충남 세종시 편입
			'410':'천안시',
			'411':'계룡시',
			'412':'공주시',
			'413':'아산시',
			'414':'당진시',
			'415':'예산군',
			'416':'서산시',
			'417':'태안시',
			'418':'홍성군',
			'419':'청양군',
			'4110':'논산시',
			'4111':'금산군',
			'4112':'부여군',
			'4113':'보령시',
			'4114':'서천군',
			'4115':'세종시',
			# 경북
			'540':'문경시',
			'541':'상주시',
			'542':'예천군',
			'543':'영주시',
			'544':'봉화군',
			'545':'영양군',
			'546':'울진군',
			'547':'안동시',
			'548':'의성군',
			'549':'김천시',
			'5410':'구미시',
			'5411':'성주군',
			'5412':'고령군',
			'5413':'칠곡군',
			'5414':'군위군',
			'5415':'영덕군',
			'5416':'정송군',
			'5417':'포항시',
			'5418':'영천시',
			'5419':'경산시',
			'5420':'청도군',
			'5421':'경주시',
			'5422':'울릉군',
			# 대구
			'530':'대구 동구', # 동구_3_
			'531':'대구 북구', # 북구_2_
			'532':'대구 수성구',
			'533':'대구 중구', # 중구_4_
			'534':'대구 서구', # 서구_2_
			'535':'대구 남구', # 남구_3_
			'536':'대구 달서구',
			'537':'대구 달성군',
			# 울산
			'520':'울산 북구', # 북구_1_
			'521':'울산 중구', # 중구_3_
			'522':'울산 동구', # 동구_2_
			'523':'울산 남구', # 남구_2_
			'524':'울산 울주군',
			# 경상남도
			'550':'거창군',
			'551':'합천군',
			'552':'함양군',
			'553':'창녕군',
			'554':'밀양시',
			'555':'양산시',
			'556':'김해시',
			'557':'창원시',
			'558':'함안군',
			'559':'의령군',
			'5510':'산청군',
			'5511':'진주시',
			'5512':'고성군', # 고성군_1_
			'5513':'거제시',
			'5514':'사천시',
			'5515':'하동군',
			'5516':'남해군',
			'5517':'통영시',
			# 부산
			'510':'부산 기장군',
			'511':'부산 북구',
			'512':'부산 금정구',
			'513':'부산 동래구',
			'514':'부산 강서구', # 강서구_1_
			'515':'부산 사상구',
			'516':'부산 사하구',
			'517':'부산 연제구',
			'518':'부산 해운대구',
			'519':'부산 부산진구',
			'510':'부산 수영구',
			'5111':'부산 남구', # 남구_1_
			'5112':'부산 동구', # 동구_1_
			'5113':'부산 서구', # 서구_1_
			'5114':'부산 중구', # 중구_2_
			'5115':'부산 영도구',
			# 전북
			'630':'무주군',
			'631':'진안군',
			'632':'전주시',
			'633':'완주군',
			'634':'익산시',
			'635':'장수군',
			'636':'남원군',
			'637':'임실군',
			'638':'순창군',
			'639':'정읍시',
			'6310':'김제시',
			'6311':'부안군',
			'6312':'고창군',
			'6313':'군산시',
			# 광주
			'620':'광주 광산구',
			'621':'광주 북구', # 북구_3_
			'622':'광주 동구', # 동구_5_
			'623':'광주 남구', # 남구_4_
			'624':'광주 서구', # 서구_4_
			# 전남
			'610':'구례군',
			'611':'곡성군',
			'612':'담양군',
			'613':'장성군',
			'614':'영광군',
			'615':'함평군',
			'616':'순천시',
			'617':'광양시',
			'618':'여수시',
			'619':'화순군',
			'6110':'나주시',
			'6111':'무안군',
			'6112':'목포시',
			'6113':'영암군',
			'6114':'보성군',
			'6115':'고흥군',
			'6116':'장흥군',
			'6117':'강진군',
			'6118':'해남군',
			'6119':'진도군',
			'6120':'완도군',
			'6121':'신안군',
			# 제주
			'640':'제주도 제주시', # 제주시_1_
			'641':'제주도 서귀포시'
		}
		reg = dic[str_region]
		
		if (stories):
			content = {'stories':stories, 'regions':regions, 'region_name':reg}
		else:
			content = {'regions':regions, 'region_name':reg}
			
		return render(request, 'maps/main.html', content)
	else:
		return render(request, 'maps/new_cover.html')

# 게시글 세부 내용 보여주기
def detail(request, story_id):
	story_detail = get_object_or_404(Story, pk=story_id)
	return render(request, 'maps/detail.html', {'story':story_detail})

# 글쓰기 및 사진 올리기
def write(request):
	if request.method == "POST":
		userid = request.session['user']
		new_author = userid
		new_img = request.FILES['img']
		new_region = request.POST['region']
		new_text = request.POST['text']
		new_spot = request.POST['spot']
		new_begin = request.POST['begin_date']
		new_end = request.POST['end_date']
		
		new_begindate = new_begin[0:4]+'-'+new_begin[4:6]+'-'+new_begin[6:8]
		new_enddate = new_end[0:4]+'-'+new_end[4:6]+'-'+new_end[6:8]
		
		story = Story(author=new_author, image=new_img, region=new_region, text=new_text, spot=new_spot, begin_date=new_begindate, end_date=new_enddate)
		
		if Region.objects.filter(author=new_author, area=new_region).exists():
			story.save()
			reg = Region.objects.get(author=new_author, area=new_region)
			reg.count = reg.count + 1
			reg.save()
		else:
			color_set= ('#f38181', '#fce38a', '#eaffd0', '#95e1d3', '#0c9463', '#2d334a', '#c7f0db', '#ef4339', '#fe6845', '#dff6f0')
			region = Region(author=new_author, area=new_region, color=random.choice(color_set))
			story.save()
			region.save()
			
	return redirect('/')	

# 게시물 수정, 삭제
def modifystory(request, story_id):
	userid = request.session['user']
	story = Story.objects.get(author=userid, pk=story_id)
	story2 = Story.objects.get(author=userid, pk=story_id)
	if request.method == "POST":
		form = StoryForm(request.POST, request.FILES)
		if form.is_valid():	
			story.image = form.cleaned_data['image']
		story.region = form.cleaned_data['region']
		story.spot = form.cleaned_data['spot']
		story.begin_date = form.cleaned_data['begin_date']
		story.end_date = form.cleaned_data['end_date']
		story.text = form.cleaned_data['text']
		story.save()
		return redirect('/')
	else:
		form = StoryForm(instance=story)
		return render(request,"maps/modifystory.html",{'form':form, 'story':story})
		
def deletestory(request, story_id):
	story = Story.objects.get(pk = story_id)
	userid = request.session['user']
	region = Region.objects.get(author=userid, area=story.region)
	region.count = region.count - 1
	region.save()
	story.delete()
	if region.count == 0:
		region.delete()
	return redirect('/')

"""
템플릿뷰 : 특별한 로직 없이 템플릿 파일만을 렌더링

리스트뷰 : 객체가 들어있는 리스트를 구성해서 이를 컨텍스트 변수로 템플릿 시스템에 넘겨줌
- 리스트를 테이블에 들어있는 모든 레코드를 가져와 구성하는 경우 테이블명, 모델 클래스명만 지정해주면 됨

디테일뷰 : 특정 객체 하나를 컨텍스트 변수에 담아서 템플릿 시스템에 넘겨줌
- 모델 클래스명만 지정해주면 됨
"""

