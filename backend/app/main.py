from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import auth, objects, events, constellations, favorites

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AstrumAtlas API",
    description="API для каталога астрономических объектов и событий",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(objects.router)
app.include_router(events.router)
app.include_router(constellations.router)
app.include_router(favorites.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to AstrumAtlas API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}