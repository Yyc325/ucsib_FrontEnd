from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from admin_role.models import Admin


class Command(BaseCommand):
    help = 'Promote the first administrator when a repaired database has none.'

    def add_arguments(self, parser):
        parser.add_argument('--phone', required=True, help='Existing account phone')

    def handle(self, *args, **options):
        with transaction.atomic():
            if Admin.objects.select_for_update().filter(
                identity=Admin.ROLE_ADMIN
            ).exists():
                raise CommandError(
                    'An administrator already exists; use role management instead.'
                )
            try:
                account = Admin.objects.select_for_update().get(
                    phone=options['phone']
                )
            except Admin.DoesNotExist as exc:
                raise CommandError('No account matches that phone number.') from exc

            account.identity = Admin.ROLE_ADMIN
            account.save(update_fields=['identity', 'update_time'])

        self.stdout.write(
            self.style.SUCCESS(f'Administrator created for {account.user_name}.')
        )
