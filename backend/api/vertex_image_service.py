import os
import uuid

import vertexai

from vertexai.preview.vision_models import (
    ImageGenerationModel
)

PROJECT_ID = "nifty-inkwell-472218-v5"

REGION = "us-central1"

vertexai.init(
    project=PROJECT_ID,
    location=REGION
)


def generate_fashion_image(prompt):

    model = ImageGenerationModel.from_pretrained(
        "imagen-3.0-generate-002"
    )

    images = model.generate_images(
        prompt=prompt,
        number_of_images=4,
        aspect_ratio="3:4",
        guidance_scale=18
    )

    output_url = []
    for image in images:
        filename = f"{uuid.uuid4()}.png"

        output_path = os.path.join(
            "media",
            "outputs",
            filename
        )

        image.save(
            location=output_path
        )

        output_url.append(f"/media/outputs/{filename}")

    return output_url