import uvicorn
from typing import List
from fastapi import FastAPI, Depends, status, Body, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import date

from db import getDb, Service, SubdivisionsLossRequest
from core import APP_HOST, APP_PORT, IS_DEV, lossForAllSubdivisionsQuery

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="build/static"), name="static")

templates = Jinja2Templates(directory="build")

@app.get('/', status_code=status.HTTP_200_OK)
async def mainPage(request: Request):
	return templates.TemplateResponse("index.html", {"request": request})

@app.get('/api/test', status_code=status.HTTP_200_OK)
async def testOk():
	return {'ok': True}

@app.get('/api/avaliable', status_code=status.HTTP_200_OK, response_model=List[str])
async def getAvailable(db: Session = Depends(getDb)):
	available_services = db.query(Service).distinct(Service.service_txt).all()
	return list(map(lambda service: service.service_txt.strip(), available_services))

@app.post('/api/loss', status_code=status.HTTP_200_OK)
async def getSubdivisionsLoss(request: List[SubdivisionsLossRequest] = Body(..., embed=False),
                              db: Session = Depends(getDb)):
	servicesLoss = []
	for serviceStop in request:
		subdivisionsLoss = db.execute(
		    lossForAllSubdivisionsQuery, {
		        'date_from': date.fromtimestamp(serviceStop.date_from // 1000).strftime('%d.%m.%Y'),
		        'date_to': date.fromtimestamp(serviceStop.date_to // 1000).strftime('%d.%m.%Y'),
		        'service': serviceStop.service,
		        'input_hours': (serviceStop.date_to - serviceStop.date_from) // 1000 // 3600
		    })

		servicesLoss.append({
		    **serviceStop.dict(), 'subdivisions':
		    dict(
		        list(
		            map(lambda subdivisionLoss: [subdivisionLoss[0].strip(), subdivisionLoss[1]],
		                subdivisionsLoss)))
		})
	return servicesLoss

if (__name__ == '__main__'):
	uvicorn.run('main:app', host=APP_HOST, port=APP_PORT, reload=IS_DEV)
