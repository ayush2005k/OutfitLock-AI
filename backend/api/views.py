import os
import zipfile
import tempfile

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.conf import settings

from .gemini_service import generate_text
from .vertex_image_service import generate_fashion_image
from .outfit_analyzer import analyze_outfit


@api_view(['POST'])
def generate_images(request):

    outfits = request.FILES.getlist('outfits')

    references = request.FILES.getlist('references')

    uploaded_outfits = []
    uploaded_references = []

    # =========================================
    # HANDLE OUTFIT FILES + ZIP UPLOADS
    # =========================================

    for file in outfits:

        # ZIP FILE SUPPORT
        if file.name.endswith(".zip"):

            temp_zip_path = os.path.join(
                settings.MEDIA_ROOT,
                file.name
            )

            # SAVE ZIP FILE
            with open(temp_zip_path, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)

            # EXTRACT ZIP
            with zipfile.ZipFile(temp_zip_path, 'r') as zip_ref:

                extract_folder = tempfile.mkdtemp()

                zip_ref.extractall(extract_folder)

                # SAVE EXTRACTED IMAGES
                for extracted_file in os.listdir(extract_folder):

                    if extracted_file.lower().endswith(
                        ('.png', '.jpg', '.jpeg')
                    ):

                        extracted_path = os.path.join(
                            extract_folder,
                            extracted_file
                        )

                        save_path = os.path.join(
                            settings.MEDIA_ROOT,
                            'uploads',
                            extracted_file
                        )

                        with open(extracted_path, 'rb') as src:
                            with open(save_path, 'wb') as dst:
                                dst.write(src.read())

                        uploaded_outfits.append(
                            extracted_file
                        )

        # NORMAL IMAGE FILES
        else:

            file_path = os.path.join(
                settings.MEDIA_ROOT,
                'uploads',
                file.name
            )

            with open(file_path, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)

            uploaded_outfits.append(file.name)

    # =========================================
    # SAVE REFERENCE IMAGES
    # =========================================

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

    # =========================================
    # ANALYZE FIRST OUTFIT IMAGE
    # =========================================

    first_outfit = uploaded_outfits[0]

    outfit_path = os.path.join(
        settings.MEDIA_ROOT,
        'uploads',
        first_outfit
    )

    garment_description = analyze_outfit(
        outfit_path
    )

    # =========================================
    # BUILD DYNAMIC AI PROMPT
    # =========================================

    prompt = f"""
Create an ultra realistic high-end fashion photoshoot.

STRICT OUTFIT PRESERVATION RULES:
- preserve EXACT garment design
- preserve same green color
- preserve same sleeves
- preserve same fit
- preserve same collar
- preserve same fabric texture
- preserve stitching and proportions

Garment details:
    {garment_description}

Generate:
- realistic male fashion model
- natural standing pose
- visible full upper body
- professional fashion photography
- luxury ecommerce catalog style
- centered composition
- clean light gray studio background
- realistic skin texture
- realistic anatomy
- highly detailed fabric folds
- realistic shadows
- soft studio lighting
- premium Zara/H&M fashion campaign style

IMPORTANT:
The t-shirt must be worn naturally by the model.
Do NOT generate floating clothing.
Do NOT crop the head.
Do NOT distort body proportions.
"""

    # =========================================
    # GENERATE FASHION OUTPUTS
    # =========================================

    generated_outputs = generate_fashion_image(
        prompt
    )

    # =========================================
    # RETURN RESPONSE
    # =========================================

    return Response({

        "message": "Generation completed",

        "outfits": uploaded_outfits,

        "references": uploaded_references,

        "garment_description": garment_description,

        "prompt_used": prompt,

        

        "generated_outputs": generated_outputs
    })