from django.db import models

class Generation(models.Model):

    outfit_name = models.CharField(max_length=255)

    generated_image = models.ImageField(
        upload_to='outputs/'
    )

    status = models.CharField(
        max_length=50,
        default='generated'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.outfit_name