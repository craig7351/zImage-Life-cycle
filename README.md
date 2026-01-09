# zImage-Life-cycle

這是一個使用 React 與 Vite 構建的生命旅程視覺化專案，展示了從 4 歲到 80 歲的人生里程碑。

🔗 **線上展示**: [https://craig7351.github.io/zImage-Life-cycle/](https://craig7351.github.io/zImage-Life-cycle/)

## 功能特色
- **生命時間軸**：以直觀的方式展示人生不同階段的重要時刻。
- **響應式設計**：適配各種裝置螢幕。
- **AI 生成圖像**：所有展示圖片皆由 zImage-Turbo 模型生成。
- **現代化技術棧**：使用 React, TypeScript, 與 Vite 進行開發。

## 技術棧
- **前端框架**: [React](https://reactjs.org/)
- **建置工具**: [Vite](https://vitejs.dev/)
- **語言**: [TypeScript](https://www.typescriptlang.org/)

## 安裝說明

請確保您的環境已安裝 [Node.js](https://nodejs.org/)。

1. 克隆專案：
   ```bash
   git clone https://github.com/craig7351/zImage-Life-cycle.git
   ```

2. 進入專案目錄：
   ```bash
   cd zImage-Life-cycle
   ```

3. 安裝依賴：
   ```bash
   npm install
   ```

## 使用方式

### 本地開發
```bash
npm run dev
```

### 建置專案
```bash
npm run build
```

## 部署至 GitHub Pages

本專案使用 GitHub Actions 自動部署至 GitHub Pages。

### 自動部署
1. Push 程式碼到 `main` 分支
2. GitHub Actions 會自動執行建置與部署
3. 部署完成後即可透過上方連結訪問

### 手動設定
1. 前往 GitHub Repository → Settings → Pages
2. Source 選擇 **GitHub Actions**
3. Push 任何變更到 `main` 分支即可觸發部署

## 授權
[MIT](LICENSE)
