import vertexai

from vertexai.preview.vision_models import ImageGenerationModel

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
        aspect_ratio="3:4"
    )

    output_path = "media/outputs/generated_image.png"

    images[0].save(location=output_path)

    return "/media/outputs/generated_image.png"