#Lida com as requisições HTTP e define a lógica de processamento e resposta às ações do usuário

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Dizimista
from .serializers import DizimistaSerializer

# Create your views here.

class DizimistaAPIView(APIView):
    def get(self, request):
        dizimistas = Dizimista.objects.filter(situacao='A')
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