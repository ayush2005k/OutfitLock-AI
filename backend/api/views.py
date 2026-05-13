import os

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.conf import settings

from .prompt_engine import build_prompt
from .gemini_service import generate_text
from .output_service import generate_placeholder_output


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

    # BUILD AI PROMPT
    prompt = build_prompt()

    # GENERATE AI RESPONSE
    ai_response = generate_text(prompt)

    # GENERATE PLACEHOLDER OUTPUTS
    generated_outputs = []

    for _ in range(3):

        image_url = generate_placeholder_output()

        generated_outputs.append(image_url)

    return Response({

        "message": "Generation completed",

        "outfits": uploaded_outfits,

        "references": uploaded_references,

        "prompt_used": prompt,

        "ai_response": ai_response,

        "generated_outputs": generated_outputs
    })