from .database import SessionLocal, engine
from .models import Base

def getDb():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()

Base.metadata.create_all(engine)