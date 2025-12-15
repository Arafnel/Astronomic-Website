from sqlalchemy import Column, Integer, String, Text, Date
from ..database import Base

class Event(Base):
    __tablename__ = "events"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    type = Column(String, nullable=False)  # eclipse, meteor_shower, conjunction
    description = Column(Text)
    visibility = Column(String)  # global, northern, southern