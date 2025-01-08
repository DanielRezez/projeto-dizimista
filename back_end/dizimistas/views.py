from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Dizimista
from .serializers import DizimistaSerializer

# Create your views here.

class DizimistaListCreateAPIView(APIView):
    def get(self, request):
        dizimistas = Dizimista.objects.all()
        serializer = DizimistaSerializer(dizimistas, many=True)
        
        return Response(serializer.data)
    
    def post(self, request):
        serializer =  DizimistaSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)