from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)
    is_organiser = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # Hash password before saving
        if not self.pk:  # Only hash on user creation
            self.password = make_password(self.password)
        super(User, self).save(*args, **kwargs)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

class Badge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    html = models.TextField()

    def __str__(self):
        return f'Badge by {self.user.name}'
