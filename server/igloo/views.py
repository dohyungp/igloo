from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from igloo.models import Experiment
from igloo.serializers import ExperimentSerializer


@csrf_exempt
def experiment_list(request):
    """List all experiments, or create a new experiment.
    """
    if request.method == 'GET':
        experiments = Experiment.objects.all()
        serializer = ExperimentSerializer(experiments, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ExperimentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    return HttpResponse(status=405)
