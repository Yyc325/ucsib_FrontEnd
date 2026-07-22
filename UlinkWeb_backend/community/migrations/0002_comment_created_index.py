from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('community', '0001_initial'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='comment',
            index=models.Index(fields=['-created_at'], name='comment_created_idx'),
        ),
    ]
