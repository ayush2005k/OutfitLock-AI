from api.vertex_image_service import generate_fashion_image

prompt = """
Luxury fashion editorial photoshoot.

Preserve exact green oversized t-shirt.
Same color.
Same sleeves.
Same stitching.
Same texture.
Same fit.

Male model.
Premium fashion photography.
Studio lighting.
Commercial ecommerce style.
"""

result = generate_fashion_image(prompt)

print(result)