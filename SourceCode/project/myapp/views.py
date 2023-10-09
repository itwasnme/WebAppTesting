from django.shortcuts import render

def home(request):
    return render(request,'home.html')

def modeA(request):
    return render(request,'modeA.html')

def modeB(request):
    return render(request,'modeB.html')