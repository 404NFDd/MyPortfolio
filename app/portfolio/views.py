from django.shortcuts import render

def index(request):
    projects = [
        {"name": "MINIST 데모", "url_name": "project_minist:index"},
    ]
    return render(request, "portfolio/index.html", {"projects": projects})
