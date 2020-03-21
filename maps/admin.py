from django.contrib import admin
from .models import Profile, Story, Region

#admin.site.register(Member)
#admin.site.register(Story)
#admin.site.register(Region)


# admin customizing
@admin.register(Profile) # decorator 형태로 등록
class StoryAdmin(admin.ModelAdmin):
	list_display = ['user', 'nickname']

@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
	list_display = ['author', 'text', 'image', 'written_date', 'begin_date', 'end_date', 'region', 'spot']
	
@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
	list_display = ['author', 'area', 'color','count'] #id로 각 세부지역 구분