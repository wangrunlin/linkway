# Link Way：连接无限可能的智能导航平台

Link Way 是一款专为内容创作者和电商从业者打造的导航站构建平台。基于先进的多维表格数据库，让用户能够轻松搭建专业的导航网站和独立站点，并通过强大的 SEO 优化获取持续稳定的流量。

[![GitHub license](https://img.shields.io/github/license/wangrunlin/linkway)][License]
[![GitHub stars](https://img.shields.io/github/stars/wangrunlin/linkway)][GitHub]
[![GitHub issues](https://img.shields.io/github/issues/wangrunlin/linkway)][Issues]

## ✨ 特性

- 🚀 零代码搭建：通过 NocoDB 表格即可管理导航内容
- 🎨 美观易用：简约现代的界面设计，支持响应式布局
- 🔍 SEO 友好：自动生成 Sitemap，支持自定义 Meta 信息
- 🛠️ 高度可定制：支持自定义主题、布局和样式
- 🌐 一键部署：支持 Vercel 一键部署，无需服务器
- 🔒 安全可靠：基于 NocoDB 的数据存储，安全且稳定

## 🚀 快速开始

### 官网

- [Link Way 官网][Link Way]

### 在线体验

- [Link Way 演示站点][Link Way Demo]

### 部署教程

1. Fork [Link Way 源码仓库][GitHub]
2. 在 [Vercel][Vercel] 中导入并部署项目
3. 在 [NocoDB][NocoDB] 中复制示例数据表
4. 获取必要的环境变量：
   - NocoDB Table ID
   - NocoDB API Token
5. 在 [Vercel][Vercel] 项目设置中配置以上环境变量
6. 触发重新部署
7. 恭喜 🎉，你已经成功创建了属于自己的 Link Way 导航平台！

## ⚙️ 环境变量说明

| 变量名          | 说明                | 获取方式                 |
| --------------- | ------------------- | ------------------------ |
| NOCODB_TABLE_ID | NocoDB 数据表 ID    | 在 NocoDB 表格设置中查看 |
| NOCODB_TOKEN    | NocoDB API 访问令牌 | 在 NocoDB 个人设置中生成 |

## 🛠️ 技术栈

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [NocoDB](https://nocodb.com/) - 开源数据库
- [Vercel](https://vercel.com/) - 部署平台

## 🤝 贡献指南

我们欢迎所有形式的贡献，无论是新功能、bug 修复还是文档改进。

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 发起 Pull Request

## 📝 开源协议

本项目采用 MIT 协议开源，详见 [LICENSE][License] 文件。

## 🙏 鸣谢

感谢所有为这个项目做出贡献的开发者们！

[Link Way]: https://linkway.site
[Link Way Demo]: https://demo.linkway.site
[GitHub]: https://github.com/wangrunlin/linkway
[Vercel]: https://vercel.com
[NocoDB]: https://nocodb.com
[License]: ./LICENSE
[Issues]: https://github.com/wangrunlin/linkway/issues
