# Incident Response Plan

## 1. 定義
- **インシデント**: SLA 違反、データ損失、セキュリティ侵害、サービス停止。
- **重大度**: SEV0 (全停止), SEV1 (主要機能停止), SEV2 (部分的影響), SEV3 (限定的)。

## 2. 体制
- インシデントコマンダー (IC): 当番エンジニア or PM
- コミュニケーションリード: CS またはマーケ
- 記録係: On-call 補佐

## 3. フロー
1. 検知 → PagerDuty → On-call が 15 分以内に ACK
2. IC 任命、インシデント Slack チャンネル作成
3. 影響範囲の把握、暫定対応 (mitigation)
4. 外部連絡 (必要に応じて: 顧客通知、Statuspage)
5. 恒久対応 (permanent fix) の計画・実施
6. クロージング & Postmortem 作成 (48h 以内)

## 4. コミュニケーション
- Slack: `#incident-YYYYMMDD-HHMM`
- ステータス共有: /status コマンド (定期)
- 顧客通知: Statuspage + メール
- 経営層: 緊急時電話/メッセージ

## 5. Postmortem テンプレ (抜粋)
- 事象概要
- タイムライン
- 影響
- 根本原因
- 対応
- 教訓 & アクションアイテム

## 6. トレーニング
- 四半期ごとに模擬インシデント
- 新メンバー向け incident bootcamp

## 7. ツール
- PagerDuty
- Slack + Zoom
- Statuspage
- Jira (アクションアイテム管理)

## 8. メトリック
- Mean Time to Detect (MTTD)
- Mean Time to Acknowledge (MTTA)
- Mean Time to Resolve (MTTR)
- 再発率

## 9. 改善
- Postmortem から Backlog へ反映
- インシデントタグ付け (SLA, Security, Infra) で統計可視化

## 10. 次アクション
- Statuspage テンプレを作成
- 年 2 回のセキュリティ演習を実施
