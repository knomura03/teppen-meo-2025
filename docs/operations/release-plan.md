# Release Plan (MVP)

## 1. リリーススケジュール
| フェーズ | 期間 | ゴール |
| --- | --- | --- |
| Alpha | Sprint 2 end | 内部ユーザー (HQ, CS) でレビュー運用を検証 |
| Beta/PoC | Sprint 3 end | 3 社 x 10 店舗で実運用開始 |
| GA | Sprint 4 end | 契約拡大、課金開始 |

## 2. マイルストーン
1. **Alpha Exit**
   - Reviews/Updates/Posts を本部チームが通しで操作
   - 重大バグ 0、E2E シナリオ成功
2. **Beta Launch**
   - テナントプロビジョニング自動化
   - サクセスチームのオンボーディング完了
3. **GA**
   - KPI レポート自動送信
   - 支払いフロー稼働

## 3. リリース準備チェックリスト
- コードフリーズの宣言
- リリースノート作成 (変更点、既知の課題)
- サポート FAQ 更新
- ロールバックプラン最終確認
- モニタリングダッシュボード起動確認

## 4. コミュニケーション
- **内部**: Slack #release、Google Meet レトロ
- **顧客向け**: メール (1 週間前)、アプリ内バナー
- **CS/営業**: Enablement セッション、FAQ 共有

## 5. ロールバック
- Vercel: 前バージョンへ 1 クリックロールバック
- DB: Point-in-time Recovery (RDS) + マイグレーションリバートスクリプト
- Feature Flag: 新機能をトグルで切り替え

## 6. リスク
- 連携 API 障害 → Feature flag で該当機能停止
- 大量データ移行 → 時間帯を分け段階的リリース
- サポート過多 → オンコール体制補強

## 7. リリース後タスク
- 24h 集中監視 (War room)
- KPI チェック (SLA, レビュー件数)
- 顧客ヒアリング (PoC 先)
- バグトリアージ (毎日)

## 8. ドキュメント
- リリースノートテンプレ: `/docs/operations/templates/release-notes.md` (作成予定)
- チェックリスト: `/docs/operations/checklists/release-checklist.md` (作成予定)

## 9. 担当
- Release Manager: PM
- QA Lead: QA
- Dev Owner: Tech Lead
- CS/Support: CS リーダー
