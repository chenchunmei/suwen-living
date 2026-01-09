
# 素问生活 - 极简健康美学博客

这是一个基于 Native ESM 架构的现代养生博客。无需任何 Node.js 构建步骤，直接托管即可运行。

## 🌐 快速部署到 GitHub Pages (完全免费)

### 1. 上传代码
1. 在 GitHub 创建一个名为 `suwen-living` 的公开仓库。
2. 使用网页上的 "Upload files" 功能，将本项目所有文件（包括文件夹）拖入上传。
3. 点击 "Commit changes" 保存。

### 2. 激活页面
1. 进入仓库的 **Settings** -> **Pages**。
2. 在 **Branch** 处选择 `main` 分支，目录选 `/(root)`。
3. 点击 **Save**。
4. 等待 1-2 分钟，访问 GitHub 提供的链接即可。

## ⚠️ 关于 AI 交互功能
本站的“问诊AI”与“文章构思”功能依赖于 **Gemini API**。

- **环境变量**：代码通过 `process.env.API_KEY` 获取密钥。
- **本地运行**：推荐使用 VS Code 的 `Live Server` 插件。
- **线上运行**：GitHub Pages 不支持直接读取环境变量。若需在线上环境使用 AI 功能，建议部署至 **Vercel** 或 **Netlify**，并在其后台设置 `API_KEY`。

## ✍️ 内容更新
1. 在“关于”页面进入“创作实验室”。
2. 生成文章 JSON 后，将其手动粘贴到 `data/content.ts` 的 `STATIC_ARTICLES` 数组中。
3. 重新上传或推送该文件，网站内容即刻更新。

---
© 2024 素问生活. 呼吸间的健康智慧。
