#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=========================================="
echo "  停止服务"
echo "=========================================="

cd "$PROJECT_DIR"

echo ""
echo "[1/2] 停止后端服务..."
if pgrep -f "node src/index.js" > /dev/null; then
    pkill -f "node src/index.js"
    echo "后端服务已停止"
else
    echo "后端服务未运行"
fi

echo ""
echo "[2/2] 停止 WAHA 容器..."
if docker ps --format '{{.Names}}' | grep -q "^waha$"; then
    docker stop waha
    echo "WAHA 容器已停止"
else
    echo "WAHA 容器未运行"
fi

echo ""
echo "=========================================="
echo "  服务已停止"
echo "=========================================="
