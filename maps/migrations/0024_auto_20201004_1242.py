# Generated by Django 3.1.1 on 2020-10-04 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0023_auto_20200929_2120'),
    ]

    operations = [
        migrations.AlterField(
            model_name='region',
            name='color',
            field=models.CharField(choices=[('#f38181', '#f38181'), ('#fce38a', '#fce38a'), ('#eaffd0', '#eaffd0'), ('#95e1d3', '#95e1d3'), ('#0c9463', '#0c9463'), ('#2d334a', '#2d334a'), ('#c7f0db', '#c7f0db'), ('#ef4339', '#ef4339'), ('#fe6845', '#fe6845'), ('#dff6f0', '#dff6f0')], default=('#c7f0db', '#c7f0db'), max_length=15),
        ),
    ]