from django.db import migrations


def create_notice_table_if_missing(apps, schema_editor):
    """Repair deployments where migration state exists but the notice table does not."""
    notice_model = apps.get_model('admin_role', 'Notice')
    existing_tables = schema_editor.connection.introspection.table_names()
    if notice_model._meta.db_table not in existing_tables:
        schema_editor.create_model(notice_model)


class Migration(migrations.Migration):
    dependencies = [
        ('admin_role', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(
            create_notice_table_if_missing,
            migrations.RunPython.noop,
        ),
    ]
