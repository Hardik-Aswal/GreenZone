#!/bin/bash
# filepath: /home/sujal/Desktop/Merge-Conflict/view_logs.sh

# Store the base directory path
BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LOGS_DIR="$BASE_DIR/logs"

# Display usage if no arguments are provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 [options] <service_name>"
    echo ""
    echo "Options:"
    echo "  -f, --follow     Follow log output (like 'tail -f')"
    echo "  -n, --lines N    Output the last N lines (default: all)"
    echo "  -a, --all        View all logs combined"
    echo ""
    echo "Service names:"
    echo "  ml               View ML service logs"
    echo "  server           View server service logs"
    echo "  client           View client service logs"
    echo ""
    echo "Examples:"
    echo "  $0 ml            View complete ML service logs"
    echo "  $0 -f server     Follow server logs in real-time"
    echo "  $0 -n 50 client  View last 50 lines of client logs"
    echo "  $0 -a            View all logs combined"
    exit 1
fi

# Initialize variables
follow_mode=false
line_count="all"
service_name=""
view_all=false

# Parse command line options
while [[ $# -gt 0 ]]; do
    case "$1" in
        -f|--follow)
            follow_mode=true
            shift
            ;;
        -n|--lines)
            line_count="$2"
            shift 2
            ;;
        -a|--all)
            view_all=true
            shift
            ;;
        *)
            service_name="$1"
            shift
            ;;
    esac
done

# Create logs directory if it doesn't exist
mkdir -p "$LOGS_DIR"

# Function to check if log file exists
check_log_file() {
    local log_file="$1"
    if [ ! -f "$log_file" ]; then
        echo "Log file $log_file does not exist."
        return 1
    fi
    return 0
}

# View all logs combined
if [ "$view_all" = true ]; then
    echo "=== Viewing all service logs ==="
    
    if [ "$follow_mode" = true ]; then
        # Follow all log files in real-time
        tail -f "$LOGS_DIR"/*.log
    elif [ "$line_count" != "all" ]; then
        # Show last N lines of all log files
        for log_file in "$LOGS_DIR"/*.log; do
            if [ -f "$log_file" ]; then
                echo "=== $(basename "$log_file") ==="
                tail -n "$line_count" "$log_file"
                echo ""
            fi
        done
    else
        # Show all log files completely
        for log_file in "$LOGS_DIR"/*.log; do
            if [ -f "$log_file" ]; then
                echo "=== $(basename "$log_file") ==="
                cat "$log_file"
                echo ""
            fi
        done
    fi
    exit 0
fi

# Handle specific service log
log_file="$LOGS_DIR/${service_name}_service.log"

# Check if the log file exists
if ! check_log_file "$log_file"; then
    echo "Available logs:"
    find "$LOGS_DIR" -name "*.log" -exec basename {} \; | sed 's/_service.log$//'
    exit 1
fi

# Display logs based on options
if [ "$follow_mode" = true ]; then
    echo "Following $service_name service logs (Ctrl+C to exit)..."
    tail -f "$log_file"
elif [ "$line_count" != "all" ]; then
    echo "Last $line_count lines of $service_name service logs:"
    tail -n "$line_count" "$log_file"
else
    echo "Complete $service_name service logs:"
    cat "$log_file"
fi