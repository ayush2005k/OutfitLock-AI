import google.generativeai as genai

from PIL import Image

from django.conf import settings


genai.configure(
    api_key=settings.GEMINI_API_KEY
)


def analyze_outfit(image_path):

    model = genai.GenerativeModel(
        "gemini-1.5-flash"
    )

    image = Image.open(image_path)

    prompt = """
    Analyze this fashion garment image.

    Identify:
    - garment type
    - color
    - sleeve style
    - fit
    - collar type
    - fabric appearance
    - patterns or prints
    - fashion style

    Return a highly detailed fashion description
    suitable for AI image generation preservation.
    """

    response = model.generate_content(
        [prompt, image]
    )

    return response.text