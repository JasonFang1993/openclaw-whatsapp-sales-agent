# 🎯 OpenClaw WhatsApp Sales Agent

> 会学习、会成长的 AI 智能销售系统

## 📌 项目简介

本项目旨在打造一个**会学习、会成长**的 AI 销售助手，通过 WhatsApp 与客户沟通，实现：

- ✅ 自动回复客户咨询
- ✅ 智能识别客户阶段（初次接触 → 建立信任 → 意向确认 → 促成下单）
- ✅ 持续学习优化（从 1% 转化率逐步提升到 15%+）
- ✅ 长期客户记忆（记住每个客户的互动历史）

## 🏗️ 技术架构

```
OpenClaw AI (大脑) → MCP Protocol → GOWA (手脚)
```

### 核心组件

| 组件 | 选择 | 理由 |
|------|------|------|
| **WhatsApp 自动化** | GOWA | MCP原生支持、40+工具、性能好 |
| **AI Agent** | OpenClaw | 已有的能力、大脑决策 |
| **集成方式** | MCP + REST + Webhook | 标准化、实时性、灵活性 |

### GOWA MCP 工具

- 📱 连接管理 (5个)：QR登录、登出、重连
- 💬 消息发送 (6个)：文本、图片、贴纸、联系人、链接、位置
- 📋 聊天管理 (5个)：联系人列表、聊天列表、消息查询
- 👥 群组管理 (13个)：创建群组、管理成员等

## 📚 项目文档

- [📖 项目方案](docs/PROJECT_PLAN.md) - 完整技术方案
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
- OpenClaw (已安装)
- WhatsApp 账号 (用于测试)

### 本地开发

```bash
# 1. 克隆项目
git clone https://github.com/JasonFang1993/openclaw-whatsapp-sales-agent.git
cd openclaw-whatsapp-sales-agent

# 2. 启动开发环境
docker-compose -f docker-compose.dev.yml up -d

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
│   ├── QUICK_START.md      # 快速开始
│   ├── ARCHITECTURE.md     # 架构设计
│   ├── API.md              # API 文档
│   ├── TESTING.md          # 测试指南
│   ├── DEPLOYMENT.md       # 部署指南
│   └── OPERATIONS.md        # 运维手册
├── src/                    # 源代码
│   ├── whatsapp/           # WhatsApp 集成
│   ├── openclaw/          # OpenClaw Skill
│   ├── learning/           # 学习系统
│   └── api/               # API 服务
├── tests/                  # 测试代码
├── scripts/                # 脚本工具
├── docker-compose.yml     # Docker 配置
├── .env.example           # 环境变量模板
├── package.json           # 项目配置
└── README.md              # 本文件
```

## 📦 版本规划

| 版本 | 目标 | 时间 | 核心功能 |
|------|------|------|---------|
| **MVP** | 验证可行性 | 2周 | 消息收发、AI 回复 |
| **V1.0** | 完整功能 | 4周 | 销售流程、学习系统 |
| **V2.0** | 优化提升 | 8周 | 转化率、数据分析 |

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

> 💡 **提示**：这是一个会学习、会成长的 AI 销售系统。随着对话数据的增加，它会越来越聪明，转化率会持续提升！
