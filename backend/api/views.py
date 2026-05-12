import os

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.conf import settings


@api_view(['POST'])
def generate_images(request):

    outfits = request.FILES.getlist('outfits')

    references = request.FILES.getlist('references')

    uploaded_outfits = []
    uploaded_references = []

    # SAVE OUTFIT IMAGES
    for file in outfits:

        file_path = os.path.join(
            settings.MEDIA_ROOT,
            'uploads',
            file.name
        )

        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        uploaded_outfits.append(file.name)

    # SAVE REFERENCE IMAGES
    for file in references:

        file_path = os.path.join(
            settings.MEDIA_ROOT,
            'references',
            file.name
        )

        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        uploaded_references.append(file.name)

    return Response({
        "message": "Files uploaded successfully",

        "outfits": uploaded_outfits,

        "references": uploaded_references
    })