# Generated by Django 4.1.5 on 2023-02-08 15:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('category', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(blank=True, default='', max_length=200, null=True)),
                ('price', models.CharField(max_length=50)),
                ('stock', models.CharField(max_length=50)),
                ('is_active', models.BooleanField(blank=True, default=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('created_at', models.DateField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(blank=True, default=1, null=True, on_delete=django.db.models.deletion.SET_NULL, to='category.category')),
            ],
        ),
    ]
