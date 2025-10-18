from django.http import HttpResponse

def index(request):
    return HttpResponse("프로젝트: MNIST (데모 홈)")
