#!/bin/bash

BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Create logs directory if it doesn't exist
mkdir -p "$BASE_DIR/logs"

echo "Starting all services..."

# Start ML service in background
cd ./ml
nohup python -m uvicorn main:app --host 0.0.0.0 --port 8000 > "$BASE_DIR/logs/ml_service.log" 2>&1 &
ML_PID=$!
echo "ML service started with PID: $ML_PID"

# Return to base directory
cd "$BASE_DIR"

# Start server service in background
cd ./server
nohup npm run dev > "$BASE_DIR/logs/server_service.log" 2>&1 &
SERVER_PID=$!
echo "Server service started with PID: $SERVER_PID"

# Return to base directory
cd "$BASE_DIR"

# Start client service in background
cd ./client
nohup npm run start > "$BASE_DIR/logs/client_service.log" 2>&1 &
CLIENT_PID=$!
echo "Client service started with PID: $CLIENT_PID"

# Return to base directory
cd "$BASE_DIR"

# Save PIDs for later use
echo "$ML_PID" > "$BASE_DIR/logs/ml_service.pid"
echo "$SERVER_PID" > "$BASE_DIR/logs/server_service.pid"
echo "$CLIENT_PID" > "$BASE_DIR/logs/client_service.pid"

echo "All services started in background:"
echo "- ML service PID: $ML_PID"
echo "- Server service PID: $SERVER_PID"
echo "- Client service PID: $CLIENT_PID"
echo "Logs are being saved to $BASE_DIR/logs directory"