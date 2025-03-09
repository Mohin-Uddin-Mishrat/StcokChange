# data/models.py
from django.db import models

class Stock(models.Model):
    date = models.CharField( max_length=100)# Date field
    trade_code = models.CharField(max_length=100)  # String field
    high = models.CharField(max_length=100)  # String field
    low = models.CharField(max_length=100)  # String field
    open = models.CharField(max_length=100)  # String field
    close = models.CharField(max_length=100)  # String field
    volume = models.CharField(max_length=100)  # String field

    def __str__(self):
        return f"{self.trade_code} - {self.date}"