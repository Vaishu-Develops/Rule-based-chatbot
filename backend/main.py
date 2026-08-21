from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path
from pydantic import BaseModel

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load hospital data
DATA_FILE = Path(__file__).parent / "data.json"
hospital_data = json.loads(DATA_FILE.read_text())

class ChatRequest(BaseModel):
    message: str
    user_id: str = "anonymous"

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    user_message = request.message.lower()
    response = {"reply": "I didn't understand that. Can you rephrase?"}
    
    # Simple rule matching
    for rule in hospital_data.get("rules", []):
        if any(keyword in user_message for keyword in rule["keywords"]):
            response = {"reply": rule["response"]}
            break
    
    return response

@app.get("/api/info")
async def get_hospital_info():
    return {
        "name": hospital_data.get("name"),
        "departments": hospital_data.get("departments", [])
    }