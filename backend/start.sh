#!/bin/bash

# Navigate to backend directory
cd "$(dirname "$0")"

# Activate virtual environment and start server
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
