#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=========================================="
echo "  服务状态检查"
echo "=========================================="

cd "$PROJECT_DIR"

echo ""
echo "【WAHA 容器状态】"
if docker ps --format '{{.Names}}' | grep -q "^waha$"; then
    echo "✓ WAHA 运行中"
    docker ps --filter "name=waha" --format "  端口: {{.Ports}}"
    docker ps --filter "name=waha" --format "  状态: {{.Status}}"
else
    echo "✗ WAHA 未运行"
fi

echo ""
echo "【后端服务状态】"
if pgrep -f "node src/index.js" > /dev/null; then
    PID=$(pgrep -f "node src/index.js")
    echo "✓ 后端服务运行中 (PID: $PID)"
    
    if command -v curl &> /dev/null; then
        PORT=$(grep "^PORT=" .env 2>/dev/null | cut -d= -f2 || echo "3000")
        if curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/health" 2>/dev/null | grep -q "200"; then
            echo "  HTTP 健康检查: ✓ OK"
        else
            echo "  HTTP 健康检查: ✗ 失败"
        fi
    fi
else
    echo "✗ 后端服务未运行"
fi

echo ""
echo "【端口监听状态】"
if command -v ss &> /dev/null; then
    ss -tlnp | grep -E ":(3000|3001)" || echo "  无端口监听"
elif command -v netstat &> /dev/null; then
    netstat -tlnp | grep -E ":(3000|3001)" || echo "  无端口监听"
fi

echo ""
echo "【最近日志】"
if [ -f logs/app.log ]; then
    echo "$(tail -5 logs/app.log)"
else
    echo "  无日志文件"
fi

echo ""
echo "=========================================="
