#Lida com as requisições HTTP e define a lógica de processamento e resposta às ações do usuário

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Dizimista
from .serializers import DizimistaSerializer

# Create your views here.

class DizimistaAPIView(APIView):
    def get(self, request, pk=None):
        if pk:
            try:
                dizimista=Dizimista.objects.get(pk=pk, situacao='A')
                serializer=DizimistaSerializer(dizimista)
                
                return Response(serializer.data)
            
            except Dizimista.DoesNotExist:
                return Response({"error": "Dizimista não encontrado!"}, status=status.HTTP_404_NOT_FOUND)
            
        else:
            situacao = request.GET.get('situacao', None)
            id_paroquia = request.GET.get('id_paroquia', None)
            
            dizimistas = Dizimista.objects.all()
            
            if situacao:
                dizimistas = dizimistas.filter(situacao=situacao)
                
            if id_paroquia:
                dizimistas = dizimistas.filter(id_paroquia=id_paroquia)
            
            serializer = DizimistaSerializer(dizimistas, many=True)
            
            return Response(serializer.data)
    
    def post(self, request):
        serializer =  DizimistaSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        dizimista = self.get_object(pk)
        serializer = DizimistaSerializer(dizimista, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)