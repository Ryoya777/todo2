# TODO アプリ

## アプリ名
TODO アプリ

## 技術スタック
- React 18 + Vite

## 主な機能
- タスクの追加・編集・削除
- タスクの完了/未完了の切り替え
- カテゴリ・タグによるフィルタリング
- LocalStorage によるデータ永続化

## ディレクトリ構成
```
src/
├── components/         # UI コンポーネント
│   ├── EmptyState.jsx
│   ├── TodoFilters.jsx
│   ├── TodoForm.jsx
│   ├── TodoItem.jsx
│   └── TodoList.jsx
├── hooks/              # カスタムフック
│   ├── useTodos.js     # タスク管理フック
│   └── useFilters.js   # フィルタリングフック
├── utils/              # ユーティリティ関数
│   └── storage.js      # LocalStorage 操作
├── styles/             # スタイルシート
│   ├── App.css
│   └── components/     # コンポーネント別スタイル
│       ├── EmptyState.module.css
│       ├── TodoFilters.module.css
│       ├── TodoForm.module.css
│       ├── TodoItem.module.css
│       └── TodoList.module.css
├── App.jsx             # メインアプリケーション
└── main.jsx            # エントリーポイント
```

## 目的
Claude Code の Issue 作成練習用
