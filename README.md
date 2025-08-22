# Case Converter

文字列を様々なケースに変換するWebアプリケーション

# Deno Deploy EA
https://case-change-kun.seri-jig.deno.net/

## 機能

入力した文字列をリアルタイムで以下のケースに変換:
- PascalCase
- camelCase
- snake_case
- kebab-case
- CONSTANT_CASE
- Title Case
- UPPERCASE
- lowercase

## ローカルで実行

```bash
# 開発モード（ファイル変更を監視）
deno task dev

# 通常実行
deno task start
```

ブラウザで http://localhost:8000 を開いてアクセス

## Deno Deployへのデプロイ

1. [Deno Deploy](https://dash.deno.com/) にアクセス
2. GitHubリポジトリと連携
3. エントリーファイルに `main.ts` を指定
4. デプロイ

## 技術スタック

- Deno 2.x
- TypeScript
- Vanilla HTML/CSS/JavaScript
- Deno.serve API
