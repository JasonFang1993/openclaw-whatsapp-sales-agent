# 🎯 OpenClaw WhatsApp Sales Agent

> 会学习，会成长的 AI 智能销售系统

## 📌 项目简介

本项目旨在打造一个**会学习，会成长**的 AI 销售助手，通过 WhatsApp 与客户沟通，实现：

- ✅ 自动回复客户咨询
- ✅ 智能识别客户阶段（初次接触 → 建立信任 → 意向确认 → 促成下单）
- ✅ 持续学习优化（从 1% 转化率逐步提升到 15%+）
- ✅ 长期客户记忆（记住每个客户的互动历史）

## 🏗️ 技术架构

```
用户 → WhatsApp → WAHA (REST API) → 后端服务 → MiniMax AI → 后端 → WAHA → 用户
```

### 核心组件

| 组件 | 选择 | 理由 |
|------|------|------|
| **WhatsApp 自动化** | WAHA Core（免费） | REST API 开箱即用、Docker 部署 |
| **AI** | MiniMax API | 免费额度、稳定快速 |
| **后端** | Node.js + Express | 轻量、文档全 |
| **数据库** | SQLite | MVP 阶段足够、免维护 |
| **部署** | Docker Compose | 一键部署、跨平台 |

### WAHA 核心功能

- 📱 会话管理：多账号支持
- 💬 消息收发：文本、图片、文件
- 📋 聊天查询：消息历史
- 🔄 Webhook：实时接收消息

## 📚 项目文档

- [📖 项目方案](docs/PROJECT_PLAN.md) - 完整技术方案
- [📋 版本管理](docs/VERSION.md) - 版本规划
- [🚀 快速开始](docs/QUICK_START.md) - 开发环境搭建
- [🏗️ 架构设计](docs/ARCHITECTURE.md) - 详细架构说明
- [📋 API 文档](docs/API.md) - 接口文档
- [🧪 测试指南](docs/TESTING.md) - 测试规范
- [📦 部署指南](docs/DEPLOYMENT.md) - 生产环境部署
- [🔧 运维手册](docs/OPERATIONS.md) - 运维和监控

## 📊 销售流程

```
客户生命周期
│
├── 初次接触 🎯 目标：建立好印象
├── 建立信任 🎯 目标：耐心解答
├── 意向确认 🎯 目标：挖掘需求
├── 促成下单 🎯 目标：消除顾虑
└── 成交/流失 🎯 目标：复盘学习
```

## 🧠 AI 学习系统

### 核心功能

- **长期记忆**：追踪每个客户的互动历史
- **阶段识别**：判断客户当前处于什么阶段
- **持续反思**：每周总结成功/失败案例
- **转化率提升**：从 1% 逐步提升到 15%+

### 学习循环

```
对话 → 执行 → 收集结果 → 分析 → 优化 → 下次对话
```

## 🚀 快速开始

### 前置要求

- Docker & Docker Compose
- Git
- Node.js 18+
- WhatsApp 账号 (用于测试)

### 本地开发

```bash
# 1. 克隆项目
git clone https://github.com/JasonFang1993/openclaw-whatsapp-sales-agent.git
cd openclaw-whatsapp-sales-agent

# 2. 启动 WAHA
docker-compose up -d

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 文件

# 4. 运行测试
npm test
```

## 📁 项目结构

```
openclaw-whatsapp-sales-agent/
├── docs/                    # 项目文档
│   ├── PROJECT_PLAN.md     # 项目方案
│   ├── VERSION.md          # 版本管理
│   ├── QUICK_START.md      # 快速开始
│   ├── ARCHITECTURE.md     # 架构设计
│   ├── API.md              # API 文档
│   ├── TESTING.md          # 测试指南
│   ├── DEPLOYMENT.md       # 部署指南
│   └── OPERATIONS.md        # 运维手册
├── src/                    # 源代码
│   ├── whatsapp/           # WhatsApp 集成
│   ├── ai/                # AI 对话
│   ├── api/                # API 服务
│   └── utils/             # 工具函数
├── tests/                  # 测试代码
├── scripts/                # 脚本工具
├── docker-compose.yml     # Docker 配置
├── .env.example           # 环境变量模板
├── package.json           # 项目配置
└── README.md              # 本文件
```

## 📦 版本规划

详见 [版本管理](docs/VERSION.md)

| 版本 | 阶段 | 时间 | 核心功能 |
|------|------|------|---------|
| v0.1-v0.3 | MVP 原型 | 3周 | 消息收发、AI对话 |
| v0.9 | MVP 预览 | 1周 | 测试、修复 |
| v1.0.0 | MVP 发布 | - | 正式发布 |
| v1.x | V1 阶段 | 6周 | 客户管理、转人工 |
| v2.x | V2 阶段 | 8周 | 智能学习 |

## 🤝 贡献指南

### 如何贡献

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 开发规范

- 代码风格：遵循 ESLint 规范
- 提交规范：使用 Conventional Commits
- 测试要求：所有功能需要单元测试
- 文档要求：API 需要更新文档

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- 项目维护：JasonFang1993
- GitHub：https://github.com/JasonFang1993/openclaw-whatsapp-sales-agent

---

> 💡 **提示**：这是一个会学习，会成长的 AI 销售系统。随着对话数据的增加，它会越来越聪明，转化率会持续提升！
