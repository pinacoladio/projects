from typing import List
from pydantic import BaseModel, validator
from datetime import datetime

class SubdivisionsLossRequest(BaseModel):
	date_from: int
	date_to: int
	service: str

	class Config:
		orm_mode = True

class SubdivisionsLossResponse(BaseModel):
	pass
