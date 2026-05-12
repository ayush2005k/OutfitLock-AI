import os

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.conf import settings


@api_view(['POST'])
def generate_images(request):

    outfits = request.FILES.getlist('outfits')

    references = request.FILES.getlist('references')

    uploaded_files = []

    # SAVE OUTFITS
    for file in outfits:

        file_path = os.path.join(
            settings.MEDIA_ROOT,
            file.name
        )

        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        uploaded_files.append(file.name)

    return Response({
        "message": "Files uploaded",
        "files": uploaded_files
    })