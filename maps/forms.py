from django import forms
from .models import Story

class StoryForm(forms.ModelForm):
    class Meta:
        model = Story
        fields = ('image', 'region', 'spot', 'begin_date', 'end_date', 'text')