from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def generate_images(request):

    return Response({
        "message": "Backend working successfully"
    })