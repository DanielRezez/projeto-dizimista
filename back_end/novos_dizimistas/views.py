from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import NovoDizimista
from dizimistas.models import Dizimista
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
    
class TransformarDizimistaAPIView(APIView):
    def post(self, request, pk):
        #Busca o novo dizimista
        novo_dizimista=get_object_or_404(NovoDizimista, pk=pk)
        
        #Extrai os dados do request
        nova_ficha = request.data.get("ficha")
        
        if not nova_ficha:
            return Response ({"error": "Número da ficha é obrigatório"})
        
        if Dizimista.objects.filter(id_paroquia=self.id_paroquia, ficha=nova_ficha).exists():
            raise ValidationError("Já existe um dizimista com esse número nesta paróquia!")
        
        try:
            #Cria um registro na tabela de dizimistas
            dizimista=Dizimista.objects.create(
                id_paroquia = novo_dizimista.id_paroquia,
                ficha = nova_ficha,
                nome = novo_dizimista.nome
                data_nascimento=novo_dizimista.data_nascimento,
                email = novo_dizimista.email,
                telefone = novo_dizimista.telefone,
                phone_permission = novo_dizimista.phone_permission,
                email_permission = novo_dizimista.email_permission,
                situacao = 'A' # Novos registros sempre são ativos
            )
            
            # Remove o registro do novo dizimista
            novo_dizimista.delete()
            
            # Retorna os dados do novo dizimista criado
            
            return Response(
                {
                    "message": "Novo dizimista transformado com sucesso.",
                    "dizimista": {
                        "id": dizimista.id,
                        "nome": dizimista.nome,
                        "ficha": dizimista.ficha,
                        "id_paroquia": dizimista.id_paroquia
                    },
                },
                status=status.HTTP_201_CREATED
            )
            
        except Exception as e:
            return Response(
                {"error": f"Erro ao transformar o dizimista: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
                
            )