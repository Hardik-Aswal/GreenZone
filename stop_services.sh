#!/bin/bash


# Store the base directory path
BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LOGS_DIR="$BASE_DIR/logs"

echo "Stopping all services..."

# Function to kill process by port using fuser
kill_process_by_port() {
    local port=$1
    local service_name=$2
    
    echo "Killing $service_name on port $port using fuser..."
    
    # Check if fuser is installed
    if ! command -v fuser &> /dev/null; then
        echo "fuser command not found. Installing..."
        sudo apt-get update && sudo apt-get install -y psmisc
    fi
    
    # Find and kill processes on the specified port
    if fuser -k -n tcp $port 2>/dev/null; then
        echo "$service_name on port $port killed successfully."
    else
        echo "No process found running on port $port or failed to kill."
        
        # Fallback to lsof if fuser failed
        if command -v lsof &> /dev/null; then
            echo "Trying with lsof as fallback..."
            local PID=$(lsof -i:$port -t)
            if [ -n "$PID" ]; then
                echo "Found process (PID: $PID) on port $port, killing..."
                kill -9 $PID
                echo "Process killed via lsof fallback."
            fi
        fi
    fi
}

# Function to stop a service
stop_service() {
    local service_name=$1
    local port=$2
    local pid_file="$LOGS_DIR/${service_name}_service.pid"
    
    echo "Stopping $service_name service..."
    
    # First try to stop by PID file
    if [ -f "$pid_file" ]; then
        PID=$(cat "$pid_file")
        if ps -p $PID > /dev/null 2>&1; then
            echo "Stopping $service_name service (PID: $PID)..."
            kill $PID
            
            # Wait for process to terminate
            for i in {1..3}; do
                if ! ps -p $PID > /dev/null 2>&1; then
                    echo "$service_name service stopped successfully."
                    break
                fi
                echo "Waiting for $service_name service to terminate..."
                sleep 1
            done
            
            # Force kill if still running
            if ps -p $PID > /dev/null 2>&1; then
                echo "$service_name service didn't stop gracefully, force killing..."
                kill -9 $PID
                echo "$service_name service force stopped."
            fi
        else
            echo "$service_name service (PID: $PID) is not running."
        fi
        
        # Remove PID file
        rm "$pid_file"
    else
        echo "No PID file found for $service_name service."
    fi
    
    # Next, try to kill by port using fuser
    if [ -n "$port" ]; then
        kill_process_by_port $port $service_name
    fi
}

echo "=== Stopping ML service ==="
stop_service "ml" 8000

echo "=== Stopping server service ==="
stop_service "server" 4000


# Final cleanup for stubborn processes
echo "=== Final cleanup for any remaining processes ==="

kill_process_by_port 4000 "Server"
kill_process_by_port 8000 "ML service"

echo "All services have been stopped."

# Optional: Clean up log files
read -p "Do you want to clean up log files? (y/n): " answer
if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
    rm -f "$LOGS_DIR"/*.log
    echo "Log files cleaned."
fi

echo "Done."