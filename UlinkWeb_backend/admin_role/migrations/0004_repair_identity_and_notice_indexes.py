from django.db import migrations, models


def ensure_identity_column(apps, schema_editor):
    """Repair databases created before the identity field was tracked by migrations."""
    admin_model = apps.get_model('admin_role', 'Admin')
    table_name = admin_model._meta.db_table

    with schema_editor.connection.cursor() as cursor:
        columns = {
            column.name
            for column in schema_editor.connection.introspection.get_table_description(
                cursor, table_name
            )
        }

    if 'identity' not in columns:
        field = models.CharField(max_length=255, default='student')
        field.set_attributes_from_name('identity')
        field.model = admin_model
        schema_editor.add_field(admin_model, field)


class Migration(migrations.Migration):
    atomic = False

    dependencies = [
        ('admin_role', '0003_alter_notice_publish_time'),
    ]

    operations = [
        migrations.RunPython(ensure_identity_column, migrations.RunPython.noop),
        migrations.AlterField(
            model_name='admin',
            name='identity',
            field=models.CharField(
                choices=[
                    ('admin', 'Administrator'),
                    ('teacher', 'Teacher'),
                    ('student', 'Student'),
                ],
                default='student',
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name='notice',
            name='status',
            field=models.CharField(
                choices=[
                    ('待发布', 'Pending'),
                    ('已发布', 'Published'),
                    ('已撤回', 'Withdrawn'),
                ],
                default='待发布',
                max_length=20,
            ),
        ),
        migrations.AddIndex(
            model_name='notice',
            index=models.Index(
                fields=['status', 'publish_time'],
                name='notice_due_idx',
            ),
        ),
        migrations.AddIndex(
            model_name='notice',
            index=models.Index(
                fields=['status', 'publish_location'],
                name='notice_location_idx',
            ),
        ),
    ]
