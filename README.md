# 🚗 ParkNow — Smart Parking Visibility System

> A real-time parking management platform for malls and large facilities.  
> Built with **FastAPI (Python)** and **Next.js (TypeScript)** using **WebSocket communication** between backend and frontend.  
>  
> 🧠 *This version uses dummy detection data to simulate AI-based parking slot updates.*

---

## 🧭 Overview

**ParkNow** is a B2B system that helps malls, offices, and campuses monitor parking slot availability using CCTV feeds.  
This MVP focuses on **real-time data flow** between backend and frontend using WebSocket — before integrating an actual AI detection model.

### 🎯 MVP Goals
- Backend (FastAPI) generates **dummy parking slot updates** every few seconds.  
- Frontend (Next.js) receives updates through **WebSocket**.  
- Dashboard displays live slot states (🟢 available / 🔴 occupied / ⚫ unknown).  
- Authentication, database, and AI will be added later.

---

## 🧩 Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| **Frontend** | Next.js (TypeScript) + TailwindCSS + WebSocket | Dashboard UI |
| **Backend** | FastAPI (Python) + WebSocket | Simulate parking data stream |
| **Database** | PostgreSQL / Supabase (later) | Store real detection results |
| **Auth** | Supabase Auth (future) | Secure dashboard access |
| **Hosting** | Vercel (frontend) + Render / DigitalOcean (backend) | Deployment |

---

## ⚙️ System Architecture

```
[Backend - FastAPI]
  ├── Simulates car detection every 3 seconds
  ├── Sends slot updates through WebSocket
       ↓
[Frontend - Next.js]
  ├── Connects to WebSocket server
  ├── Updates dashboard in real-time
  └── Displays total slots and availability status
```

---

## 🏗️ Project Structure

```
parknow/
├── backend/
│   ├── main.py              # FastAPI + WebSocket server
│   ├── dummy_data.py        # Simulated slot updates
│   └── requirements.txt
└── frontend/
    ├── pages/
    │   ├── index.tsx        # Landing page
    │   └── dashboard.tsx    # Live slot dashboard
    ├── components/
    │   └── ParkingGrid.tsx  # Visual slot grid
    └── tailwind.config.js
```

---

## ⚙️ Backend Setup (FastAPI + WebSocket)

### 1️⃣ Setup Environment
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn
```

### 2️⃣ Create `main.py`
```python
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio, random

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Example slots
slots = [{"id": f"A{i}", "status": "available"} for i in range(1, 11)]

@app.websocket("/ws/slots")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        # Simulate random slot changes
        random_slot = random.choice(slots)
        random_slot["status"] = random.choice(["available", "occupied", "unknown"])
        await websocket.send_json(slots)
        await asyncio.sleep(3)
```

### 3️⃣ Run Backend
```bash
uvicorn main:app --reload
```
Backend will run at:  
👉 `http://localhost:8000/ws/slots`

---

## 💻 Frontend Setup (Next.js + WebSocket)

### 1️⃣ Create Project
```bash
cd frontend
npx create-next-app@latest . --ts
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2️⃣ Configure Tailwind
In `tailwind.config.js`:
```js
content: [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
],
theme: { extend: {} },
plugins: [],
```

### 3️⃣ Add `ParkingGrid` Component
**`/components/ParkingGrid.tsx`**
```tsx
type Slot = { id: string; status: string };

export default function ParkingGrid({ slots }: { slots: Slot[] }) {
  const getColor = (status: string) => {
    if (status === "available") return "bg-green-500";
    if (status === "occupied") return "bg-red-500";
    return "bg-gray-400";
  };

  return (
    <div className="grid grid-cols-5 gap-2 mt-6">
      {slots.map((slot) => (
        <div
          key={slot.id}
          className={`p-4 rounded text-white text-center font-bold ${getColor(slot.status)}`}
        >
          {slot.id}
        </div>
      ))}
    </div>
  );
}
```

### 4️⃣ Create Dashboard Page
**`/pages/dashboard.tsx`**
```tsx
import { useEffect, useState } from "react";
import ParkingGrid from "../components/ParkingGrid";

type Slot = { id: string; status: string };

export default function Dashboard() {
  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/slots");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSlots(data);
    };
    return () => ws.close();
  }, []);

  const available = slots.filter((s) => s.status === "available").length;

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold">ParkNow Dashboard</h1>
      <p className="mt-2 text-gray-600">
        {available} / {slots.length} slots available
      </p>
      <ParkingGrid slots={slots} />
    </div>
  );
}
```

### 5️⃣ Run Frontend
```bash
npm run dev
```
Frontend will run at:  
👉 `http://localhost:3000/dashboard`

---

## 🧪 Test the Flow
1. Run the FastAPI backend (`uvicorn main:app --reload`).  
2. Run the Next.js frontend (`npm run dev`).  
3. Open **`http://localhost:3000/dashboard`**  
4. Watch live slot updates every few seconds through WebSocket.

---

## 🧱 Next Steps (for AI or Future Devs)
| Phase | Description |
|--------|--------------|
| **Phase 1** | ✅ Dummy WebSocket connection (done) |
| **Phase 2** | Connect to real database (PostgreSQL / Supabase) |
| **Phase 3** | Replace dummy data with YOLO/OpenCV detection results |
| **Phase 4** | Add authentication (Supabase Auth / JWT) |
| **Phase 5** | Deploy backend (Render/DigitalOcean) & frontend (Vercel) |
| **Phase 6** | Optional: Add ad slots, analytics dashboard, predictive AI |

---

## 📦 Environment Variables (for future use)
```
DATABASE_URL=postgresql://user:password@localhost:5432/parknow
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=xxxxx
```

---

## 🧠 Notes for AI Developers
- Maintain modular code: each component (auth, detection, dashboard) should be isolated.  
- Add type hints and docstrings for every function.  
- Document all API endpoints clearly in `README` or Swagger docs.  
- Follow consistent commit messages:  
  - `feat: add websocket connection`
  - `refactor: improve slot update interval`
  - `fix: reconnect websocket on error`

---

## 👤 Author
**Project Lead:** Alvin Christopher  
🖥️ Focus: Web + AI Integration for Smart Parking  
📧 Contact: [your email or GitHub profile link]

---

## 📄 License
MIT License — open for educational and hackathon use.
# cau-hacktathon
