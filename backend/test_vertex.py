from api.vertex_image_service import (
    generate_fashion_image
)

prompt = """
Ultra realistic fashion photography.

Preserve EXACTLY:
- plain green t-shirt
- regular fit
- short sleeves
- round neck collar
- minimal design
- cotton fabric
- same green color
- simple basic t-shirt structure

Male model in dynamic fashion pose.

Maintain outfit consistency.

Professional ecommerce photography.
Studio lighting.
Highly realistic.
"""

result = generate_fashion_image(
    prompt
)

print(result)