#Lida com as requisições HTTP e define a lógica de processamento e resposta às ações do usuário

from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Dizimista
from .serializers import DizimistaSerializer
from django.db.models import Q


# Create your views here.

class DizimistaAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
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
    
class AniversariantesAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        data_inicio = request.GET.get('data_inicio', None)
        data_fim = request.GET.get('data_fim', None)
        id_paroquia = request.GET.get('id_paroquia', None)
        
        if data_inicio and data_fim:
            try:
                data_inicio = datetime.strptime(data_inicio, '%Y-%m-%d').date()
                data_fim = datetime.strptime(data_fim, '%Y-%m-%d').date()

            except ValueError:
                return Response({"error": "Formato de data inválido. Use AAAA-MM-DD"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            data_inicio = data_fim = datetime.now().date()
        
        if data_inicio != data_fim:
            
            aniversariantes = Dizimista.objects.filter(
                Q(data_nascimento__month__gte=data_inicio.month, data_nascimento__day__gte=data_inicio.day) &
                Q(data_nascimento__month__lte=data_fim.month, data_nascimento__day__lte=data_fim.day) & Q(id_paroquia=id_paroquia))
        
        else:
            aniversariantes = Dizimista.objects.filter(data_nascimento__month=data_inicio.month, data_nascimento__day=data_inicio.day, id_paroquia=id_paroquia)
        
        aniversariantes_serializer = DizimistaSerializer(aniversariantes, many=True)
        
        return Response({"aniversariantes": aniversariantes_serializer.data}, status=status.HTTP_200_OK)
        