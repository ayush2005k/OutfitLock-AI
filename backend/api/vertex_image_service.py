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
        number_of_images=1,
        aspect_ratio="3:4",
        guidance_scale=18
    )

    filename = f"{uuid.uuid4()}.png"

    output_path = os.path.join(
        "media",
        "outputs",
        filename
    )

    images[0].save(
        location=output_path
    )

    return f"/media/outputs/{filename}"