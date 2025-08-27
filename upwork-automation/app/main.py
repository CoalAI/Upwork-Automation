from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import job_listings, rag_relevance
from app.db.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Upwork Automation Tool API")

origins = ["*"] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(job_listings.router, prefix="/api/job-listings", tags=["job-listings"])
app.include_router(rag_relevance.router, prefix="/api", tags=["jobs"])


@app.get("/")
async def root():
    return {"message": "Welcome to Upwork Automation Tool API"}
