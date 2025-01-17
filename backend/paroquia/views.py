from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Paroquia
from .serializers import ParoquiaSerializer

# Create your views here.

class ParoquiaAPIView(APIView):
    def get(self, request, pk=None, situacao='A'):
        if pk:
            try:
                paroquia = Paroquia.objects.get(pk=pk, situacao=situacao)
                serializer = ParoquiaSerializer(paroquia)
                
                return Response(serializer.data)
            
            except Paroquia.DoesNotExist:
                
                return Response({"error": "Paróquia não encontrada"}, status=status.HTTP_404_NOT_FOUND)
            
        else:
            paroquias = Paroquia.objects.filter(situacao='A')
            serializer = ParoquiaSerializer(paroquias, many=True)
        
            return Response(serializer.data)
