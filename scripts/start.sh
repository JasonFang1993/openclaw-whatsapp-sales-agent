#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=========================================="
echo "  启动服务"
echo "=========================================="

cd "$PROJECT_DIR"

echo ""
echo "[1/2] 启动 WAHA (Docker)..."
if docker ps -a --format '{{.Names}}' | grep -q "^waha$"; then
    if docker ps --format '{{.Names}}' | grep -q "^waha$"; then
        echo "WAHA 容器已在运行"
    else
        docker start waha
        echo "WAHA 容器已启动"
    fi
else
    docker-compose up -d
    echo "WAHA 容器已创建并启动"
fi

echo ""
echo "[2/2] 启动后端服务..."
if [ -f .env ]; then
    source .env
else
    echo "警告: .env 文件不存在，使用默认配置"
fi

nohup npm start > logs/app.log 2>&1 &
echo "后端服务已启动 (PID: $!)"

sleep 2

echo ""
echo "=========================================="
echo "  服务启动完成!"
echo "=========================================="
echo ""
echo "查看日志: tail -f logs/app.log"
echo "检查状态: bash scripts/status.sh"
