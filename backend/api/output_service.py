import os
import uuid
import requests

from django.conf import settings


def generate_placeholder_output():

    image_url = "https://picsum.photos/600/800"

    response = requests.get(image_url)

    filename = f"{uuid.uuid4()}.jpg"

    output_path = os.path.join(
        settings.MEDIA_ROOT,
        "outputs",
        filename
    )

    with open(output_path, "wb") as file:
        file.write(response.content)

    return f"/media/outputs/{filename}"