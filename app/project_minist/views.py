from django.http import HttpResponse

def index(request):
    return HttpResponse("프로젝트: MINIST (데모 홈)")
