from django.urls import path
from .views import createRecord ,getAllRecords , getRecord ,updateRecord ,deleteRecord , searchRecord

urlpatterns = [
    path('create/record/' ,createRecord ,name='create-record' ),
    path('get/all/records/' ,getAllRecords , name='get-all-record' ),
    path('get/records/<int:id>/' , getRecord , name='get-record-by-id'),
    path('update/record/<int:id>/' , updateRecord , name='update-record'),
    path('delete/record/<int:id>/' , deleteRecord , name='delete-record'),
    path('search/data/' , searchRecord , name='search-record')
]