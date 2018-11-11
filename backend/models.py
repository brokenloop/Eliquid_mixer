from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from base import Base

class Recipe(Base):
	__tablename__ = 'recipes'
	__table_args__ = (UniqueConstraint('name', 'version', name='uix_1'),)
	id = Column(Integer, primary_key=True)
	name = Column("name", String)
	version = Column("version", Integer)
	batchvolume = Column("batchvolume", Integer)
	batchnic = Column("batchnic", Integer)
	batchratio = Column("batchratio", Integer)
	basenic = Column("basenic", Integer)
	baseratio = Column("baseratio", Integer)
	flavours = relationship("Flavour", cascade="all, delete-orphan")
	

class Flavour(Base):
	__tablename__ = 'flavours'
	id = Column(Integer, primary_key=True)
	name = Column("name", String)
	volume = Column("volume", Integer)
	recipeid = Column(Integer, ForeignKey('recipes.id'))

		
