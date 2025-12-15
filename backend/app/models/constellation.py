from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from ..database import Base

class Constellation(Base):
    __tablename__ = "constellations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    short_description = Column(String)
    
    objects = relationship("AstronomicObject", back_populates="constellation")