from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class AstronomicObject(Base):
    __tablename__ = "objects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    type = Column(String, nullable=False)
    short_description = Column(String)
    description = Column(Text)
    distance_ly = Column(Float)
    magnitude = Column(Float)
    constellation_id = Column(Integer, ForeignKey("constellations.id"))
    image_url = Column(String)
    
    constellation = relationship("Constellation", back_populates="objects")
    favorites = relationship("Favorite", back_populates="astronomic_object")