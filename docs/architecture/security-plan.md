# Security Plan (MVP → GA)

## 1. ポリシー概要
- Zero Trust の原則を採用し、最小権限アクセスを徹底。
- データ分類: PII、業務データ、公開情報で分割。

## 2. 認証・認可
- Auth.js + SSO (SAML/OIDC) サポート。
- ロールベースアクセス (RBAC) + テナント隔離。
- 重要操作は MFA 要求 (レビュー削除、ロール変更など)。

## 3. データ保護
- 保存時暗号化: PostgreSQL (TDE), S3 (SSE-S3 or SSE-KMS)。
- 転送時暗号化: HTTPS/TLS1.2+、HSTS。
- 機微データはカラムレベル暗号化 (例: API キー)。

## 4. 秘密管理
- Vercel/CI: Encrypted secrets。
- Backend: AWS Secrets Manager or Doppler。
- ローテーション: 90 日ごと。

## 5. セキュリティテスト
- 静的解析: ESLint security、npm audit、Snyk。
- 動的解析: OWASP Zap (Staging)、Burp Suite (年次)。
- ペネトレーションテスト: GA 直前に第三者実施。

## 6. ログ/監査
- 監査ログ: ログイン、データ更新、権限変更。
- 監査ログ保持: 1 年。
- 可視化: Datadog/SIEM (Elastic, Panther) を検討。

## 7. インシデント対応
- `docs/operations/incident-response-plan.md` に基づき、セキュリティインシデント向けワークフローを整備。
- 侵害発見時は 24h 以内に当局/顧客へ報告。

## 8. コンプライアンス
- 国内個人情報保護法遵守。
- GDPR 影響評価 (国際展開フェーズ)。
- SOC2 タイプ 1 を 2 年目に向けて準備。

## 9. トレーニング
- 開発者向けセキュアコーディング研修 (半期)
- ソーシャルエンジニアリング対策 (フィッシング演習)

## 10. TODO
- セキュリティ責任者 (CISO 代理) を任命。
- 無料脆弱性診断ツールの導入。
- セキュリティ要件を `non-functional-requirements.md` と同期。
