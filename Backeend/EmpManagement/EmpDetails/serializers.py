from rest_framework import serializers
from .models import EmpModel

class EmpModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmpModel
        fields = "__all__"