#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=========================================="
echo "  初始化脚本"
echo "=========================================="

cd "$PROJECT_DIR"

echo ""
echo "[1/3] 安装 Node.js 依赖..."
if ! command -v node &> /dev/null; then
    echo "Node.js 未安装，正在安装..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

echo "Node.js 版本: $(node --version)"
echo "npm 版本: $(npm --version)"

npm install

echo ""
echo "[2/3] 配置环境变量..."
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo ".env 文件已创建，请编辑并配置必要参数!"
        echo ""
        echo "需要配置的关键变量:"
        echo "  - OPENAI_API_KEY"
        echo "  - WAHA_SESSION"
    else
        echo "警告: .env.example 不存在"
    fi
else
    echo ".env 文件已存在"
fi

echo ""
echo "[3/3] 创建必要目录..."
mkdir -p waha-data logs

echo ""
echo "=========================================="
echo "  初始化完成!"
echo "=========================================="
