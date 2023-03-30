from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import openai
import os
from django.views.decorators.csrf import csrf_exempt
import asyncio
import json

from dotenv import load_dotenv
# Create your views here.

load_dotenv()


key = os.getenv('OPEN_AI_API_KEY')


openai.api_key = key

async def generate_image(input):
    response =openai.Image.create(
        prompt= input,
        n=2,
        size="1024x1024"
    )
    url = response['data'][0]['url']
    print('/n')
    print(url)
    return url

@csrf_exempt
def dalle_generation(request):

    if request.method == 'POST':
        prompt = json.loads(request.body)
        print(prompt)
        url = asyncio.run(generate_image(prompt))
        print(url)
        return JsonResponse({'url': url})
    
    elif request.method =='GET':
        content = {"connection": "DJANGO"}
        return JsonResponse(content)
    else:
        pass