from sqlalchemy import Column, Integer, String, Date
from .database import Base

class WorkTime(Base):
	__tablename__ = 'work_time'

	id = Column(Integer, primary_key=True, index=True)
	date = Column(Date)
	employee = Column(Integer)
	working_hours = Column(Integer)
	subdivision_work = Column(Integer)
	subdivision_txt = Column(String)

class Employee(Base):
	__tablename__ = 'employee'

	id = Column(Integer, primary_key=True, index=True)
	employee = Column(Integer)
	subdivision_salary = Column(Integer)
	subdivision_txt = Column(String)
	month = Column(Date)
	position = Column(Integer)
	position_txt = Column(String)
	gender = Column(Integer)
	full_name = Column(String)
	salary = Column(Integer)

class Service(Base):
	__tablename__ = 'service'

	id = Column(Integer, primary_key=True, index=True)
	subdivision_work = Column(Integer)
	subdivision_txt = Column(String)
	position = Column(Integer)
	position_txt = Column(String)
	service = Column(Integer)
	service_txt = Column(String)
	persent_use_in_work_time = Column(Integer)

class Nodes(Base):
	__tablename__ = 'nodes'

	id = Column(Integer, primary_key=True, index=True)
	id_node = Column(Integer)
	id_subdivision = Column(Integer)
	subdivision_txt = Column(String)
	parent_node = Column(Integer)
	next_node = Column(Integer)