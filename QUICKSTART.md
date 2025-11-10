# ParkNow Quick Start Guide

## Prerequisites
- Python 3.8+ installed
- Node.js 18+ installed

## Running the Application

### 1. Start the Backend (Terminal 1)

```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

The backend will run at: **http://localhost:8000**

### 2. Start the Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

The frontend will run at: **http://localhost:3000**

### 3. View the Application

- **Landing Page**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## What to Expect

1. Open the dashboard at http://localhost:3000/dashboard
2. You should see:
   - A live connection indicator (green dot)
   - Real-time statistics (Available, Occupied, Unknown)
   - A grid of 10 parking slots (A1-A10)
   - Slots changing color every 3 seconds:
     - 🟢 Green = Available
     - 🔴 Red = Occupied
     - ⚫ Gray = Unknown

## Troubleshooting

### WebSocket Connection Issues
- Make sure the backend is running on port 8000
- Check browser console for errors (F12)
- Verify CORS settings in backend/main.py

### Backend Not Starting
- Ensure virtual environment is activated
- Install dependencies: `pip install -r requirements.txt`

### Frontend Not Starting
- Run `npm install` if node_modules missing
- Clear .next cache: `rm -rf .next`

## Next Steps

1. **Add Database**: Connect to PostgreSQL/Supabase
2. **Integrate AI**: Replace dummy data with YOLO detection
3. **Add Authentication**: Implement user login system
4. **Deploy**: Host on Vercel (frontend) + Render (backend)
