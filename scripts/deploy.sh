#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=========================================="
echo "  WhatsApp Sales Agent - 一键部署"
echo "=========================================="

cd "$PROJECT_DIR"

echo ""
echo "[1/3] 检查并安装 Docker..."
if ! command -v docker &> /dev/null; then
    echo "Docker 未安装，正在安装..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    echo "Docker 安装完成!"
else
    echo "Docker 已安装: $(docker --version)"
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "Docker Compose 未安装，正在安装..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

echo ""
echo "[2/3] 初始化环境..."
bash "$SCRIPT_DIR/init.sh"

echo ""
echo "[3/3] 启动服务..."
bash "$SCRIPT_DIR/start.sh"

echo ""
echo "=========================================="
echo "  部署完成!"
echo "=========================================="
echo ""
echo "服务状态检查: bash scripts/status.sh"
echo "停止服务: bash scripts/stop.sh"
echo ""
