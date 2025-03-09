from django.core.management.base import BaseCommand
from data.models import Stock  # Import the Stock model
import json

class Command(BaseCommand):
    help = 'Load stock data into the database'

    def handle(self, *args, **kwargs):
        with open('data/stock_data.json', 'r') as file:
            stock_data = json.load(file)

        for item in stock_data:
            Stock.objects.update_or_create(
                date=item['date'], 
                trade_code=item['trade_code'],
                defaults={
                    'high': item['high'],
                    'low': item['low'],
                    'open': item['open'],
                    'close': item['close'],
                    'volume': item['volume']
                }
            )

        self.stdout.write(self.style.SUCCESS('Successfully loaded stock data'))