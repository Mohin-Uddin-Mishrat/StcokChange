from django.core.management.base import BaseCommand
from data.models import Stock  # Replace with your model

class Command(BaseCommand):
    help = 'Delete all data from the Stock model'

    def handle(self, *args, **kwargs):
        Stock.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Successfully deleted all stock data'))