from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from.models import NovoDizimista
from .serializers import NovoDizimistaSerializer

# Create your views here.

class NovoDizimistaAPIView(APIView):
    def get(self, request):
        dizimistas = NovoDizimista.objects.filter(situacao='A')
        serializer = NovoDizimistaSerializer(dizimistas, many=True)
        
        return Response(serializer.data)

    def post(self, request):
        serializer = NovoDizimistaSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        novo_dizimista = self.get_object(pk)
        serializer = NovoDizimistaSerializer(novo_dizimista, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)