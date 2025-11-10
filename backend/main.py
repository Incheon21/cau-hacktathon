from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import random

app = FastAPI()

# Configure CORS to allow frontend connection
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize parking slots for different locations
parking_locations = {
    "lotteworld": {
        "name": "LOTTEWORLD MALL",
        "totalSlots": 250,
        "slots": [{"id": f"LOTTEWORLD-{i}", "status": random.choice(["available", "occupied"])} for i in range(1, 251)]
    },
    "jakarta": {
        "name": "JAKARTA MALL",
        "totalSlots": 180,
        "slots": [{"id": f"JAKARTA-{i}", "status": random.choice(["available", "occupied"])} for i in range(1, 181)]
    },
    "paskal": {
        "name": "PASKAL",
        "totalSlots": 150,
        "slots": [{"id": f"PASKAL-{i}", "status": random.choice(["available", "occupied"])} for i in range(1, 151)]
    },
    "coex": {
        "name": "COEX MALL",
        "totalSlots": 300,
        "slots": [{"id": f"COEX-{i}", "status": random.choice(["available", "occupied"])} for i in range(1, 301)]
    },
    "dashboard": {
        "name": "Dashboard",
        "totalSlots": 10,
        "slots": [{"id": f"A{i}", "status": "available"} for i in range(1, 11)]
    }
}


@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "ParkNow Backend API", "status": "running"}


@app.get("/locations")
async def get_locations():
    """Get all available locations"""
    return {
        location_id: {
            "name": data["name"],
            "totalSlots": data["totalSlots"],
            "available": sum(1 for slot in data["slots"] if slot["status"] == "available"),
            "occupied": sum(1 for slot in data["slots"] if slot["status"] == "occupied")
        }
        for location_id, data in parking_locations.items()
    }


@app.get("/slots/{location_id}")
async def get_location_slots(location_id: str):
    """Get current slot status for a specific location"""
    if location_id not in parking_locations:
        return {"error": "Location not found"}
    return parking_locations[location_id]["slots"]


@app.websocket("/ws/slots/{location_id}")
async def websocket_endpoint(websocket: WebSocket, location_id: str):
    """
    WebSocket endpoint for real-time parking slot updates for a specific location.
    Simulates random slot status changes every 3 seconds.
    """
    await websocket.accept()
    print(f"Client connected to WebSocket for location: {location_id}")

    if location_id not in parking_locations:
        await websocket.send_json({"error": "Location not found"})
        await websocket.close()
        return

    try:
        while True:
            location_data = parking_locations[location_id]
            slots = location_data["slots"]
            
            # Simulate random slot changes (change 1-3 slots per update)
            num_changes = random.randint(1, 3)
            for _ in range(num_changes):
                random_slot = random.choice(slots)
                old_status = random_slot["status"]
                # Toggle between available and occupied
                random_slot["status"] = "available" if old_status == "occupied" else "occupied"
                print(f"[{location_id}] {random_slot['id']}: {old_status} -> {random_slot['status']}")

            # Send updated slots to frontend
            await websocket.send_json(slots)

            # Wait 3 seconds before next update
            await asyncio.sleep(3)

    except WebSocketDisconnect:
        print(f"Client disconnected from {location_id}")
    except Exception as e:
        print(f"WebSocket error for {location_id}: {e}")
    finally:
        print(f"WebSocket closed for {location_id}")


# Legacy endpoint for dashboard compatibility
@app.get("/slots")
async def get_slots():
    """Get current slot status (legacy endpoint for dashboard)"""
    return parking_locations["dashboard"]["slots"]


@app.websocket("/ws/slots")
async def websocket_dashboard_endpoint(websocket: WebSocket):
    """
    Legacy WebSocket endpoint for dashboard.
    Redirects to dashboard location.
    """
    await websocket_endpoint(websocket, "dashboard")
