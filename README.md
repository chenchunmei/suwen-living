
# 素问生活 - 静态部署指南

这是一个基于 Native ESM 架构的现代养生博客。无需任何 Node.js 构建步骤，直接托管即可运行。

## 🚀 快速部署方案

### 方案一：Vercel (最简单，推荐)
1. 注册并登录 [Vercel](https://vercel.com/)。
2. 将本项目文件夹直接拖入 Vercel 的部署框。
3. 或者：将代码推送到 GitHub，在 Vercel 中点击 "Import Project"。
4. **环境变量**：在 Vercel 控制面板的 `Environment Variables` 中添加 `API_KEY`，填入您的 Gemini API Key。

### 方案二：GitHub Pages (完全免费)
1. 在 GitHub 创建新仓库。
2. 开启 `Settings -> Pages`。
3. 选择 `Source: Deploy from a branch` 并指向 `main` 分支。
4. 访问 `https://<your-username>.github.io/<repo-name>` 即可。

## ✍️ 如何更新内容？
1. 在网站的 **“关于”** 页面进入 **“创作实验室”**。
2. 输入主题，让 AI 生成文章 JSON。
3. 复制生成的 JSON 代码。
4. 打开 `data/content.ts` 文件。
5. 将代码粘贴到 `STATIC_ARTICLES` 数组的最前面。
6. 保存文件并推送/上传，网站会自动完成更新。

## 🛠 开发环境
- 无需 `npm install`。
- 使用 Live Server (如 VS Code 插件) 即可本地预览。
