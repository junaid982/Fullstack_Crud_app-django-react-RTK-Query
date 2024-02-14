from django.shortcuts import render


from .models import EmpModel
from .serializers import EmpModelSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.



# this view is used to store database
@api_view(['POST'])
def createRecord(request):
    
    serializer = EmpModelSerializer(data = request.data )
    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data , status=status.HTTP_201_CREATED)


    return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)


# this function is used to get all the employee records 
@api_view(['GET'])
def getAllRecords(request):

    records = EmpModel.objects.all()
    serializer = EmpModelSerializer(records ,many=True)

    return Response(serializer.data , status=status.HTTP_200_OK)


# this funtion is used to retrn emp records by id 
@api_view(['GET'])
def getRecord(request , id = None):

    try:
        
        record = EmpModel.objects.get(id = id )
        serializer = EmpModelSerializer(record)
        return Response(serializer.data , status=status.HTTP_200_OK)

    except:
        res = {"error" : "Employee not found"}
        return Response(res , status=status.HTTP_404_NOT_FOUND)


# This function is used to update current record 
@api_view(['PATCH'])
def updateRecord(request , id = None):
    try:
        old_record = EmpModel.objects.get(id = id)
        new_record = request.data

        serializer = EmpModelSerializer(old_record , data = new_record ,partial = True)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data , status=status.HTTP_200_OK)
        
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
    except:
        res = {"error" : "Employee not found"}
        return Response(res , status=status.HTTP_404_NOT_FOUND)


# this method is used to delete the record 
@api_view(['DELETE'])
def deleteRecord(request , id = None):
    try:
        record = EmpModel.objects.get(id = id )
        record.delete()

        res = {"message" : "Record deleted successfully."}
        return Response(res , status=status.HTTP_200_OK)
    except:
        res = {"error" : "Employee not found"}
        return Response(res , status=status.HTTP_404_NOT_FOUND)


# this method is used to search a record
    
# @api_view(['GET'])
# def searchRecord(request):
    
#     emp_name = request.GET.get('emp_name' , None)

#     if emp_name is not None:
#         record = EmpModel.objects.filter(emp_name__contains = emp_name)
#         serializer = EmpModelSerializer(record , many=True)
#         return Response(serializer.data , status=status.HTTP_200_OK)
    

#     records =EmpModel.objects.all()
#     serializer = EmpModelSerializer(records , many=True)
#     return Response(serializer.data , status=status.HTTP_200_OK)



@api_view(['GET'])
def searchRecord(request):
    
    emp_name = request.GET.get('emp_name' , None)
    emp_email = request.GET.get('emp_email' , None)

    records = EmpModel.objects.all()

    if emp_name is not None:
        records = records.filter(emp_name__contains = emp_name)
        # serializer = EmpModelSerializer(record , many=True)
        # return Response(serializer.data , status=status.HTTP_200_OK)
    
    if emp_email is not None:
        records = records.filter(emp_email__contains = emp_email)

    serializer = EmpModelSerializer(records , many=True)
    return Response(serializer.data , status=status.HTTP_200_OK)