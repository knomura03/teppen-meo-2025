# API Design (MVP)

## Guiding Principles
- RESTful endpoints with predictable resource naming (後で tRPC 検討)
- JSON responses, pagination via cursor
- Authenticated via JWT (session) + role-based scopes

## Resources
### Reviews
- `GET /api/reviews` : filters (status, locationId, slaState, rating)
- `GET /api/reviews/:id`
- `POST /api/reviews/:id/reply` : body { templateId?, body }
- `POST /api/reviews/:id/assign` : body { assigneeId }
- `POST /api/reviews/:id/escalate`

### Review Templates
- `GET /api/review-templates`
- `POST /api/review-templates`
- `PUT /api/review-templates/:id`
- `DELETE /api/review-templates/:id`

### Update Requests
- `GET /api/requests` : filters (status, locationId, type)
- `POST /api/requests`
- `POST /api/requests/:id/approve`
- `POST /api/requests/:id/reject`
- `GET /api/requests/:id/history`

### Posts
- `GET /api/posts`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `POST /api/posts/:id/schedule`
- `POST /api/posts/:id/approve`

### Analytics
- `GET /api/analytics/overview` : query { dateRange, locationId?, brand? }
- `GET /api/analytics/reviews`
- `GET /api/analytics/traffic`
- `GET /api/analytics/sla`

### Locations & Users
- `GET /api/locations`
- `POST /api/locations`
- `GET /api/users`
- `POST /api/users`
- `POST /api/users/:id/roles`

### Notifications
- `POST /api/notifications/test`
- `POST /api/notifications/settings`

## Data Models (概要)
```ts
Review {
  id: string
  locationId: string
  rating: number
  comment: string
  source: 'google'
  createdAt: Date
  slaDueAt: Date
  status: 'pending' | 'in_progress' | 'completed' | 'escalated'
  assigneeId?: string
  reply?: Reply
}

Reply {
  id: string
  reviewId: string
  authorId: string
  body: string
  templateId?: string
  createdAt: Date
}

Request {
  id: string
  locationId: string
  type: 'hours' | 'menu' | 'attribute'
  payload: JSON
  status: 'pending' | 'approved' | 'rejected'
  submittedBy: string
  approvedBy?: string
  timeline: RequestEvent[]
}
```

## Integration with GBP API
- Scheduled job pulls reviews via `accounts.locations.reviews.list`
- Posting replies via `accounts.locations.reviews.reply`
- Business information updates via `accounts.locations.patch`
- Local posts via `accounts.locations.localPosts`

## Error Handling
- Use problem+json response for errors
- Standard error codes: `INVALID_INPUT`, `NOT_FOUND`, `PERMISSION_DENIED`, `GBP_SYNC_FAILED`

## Versioning
- Start with `/api/v1` prefix
- Breaking changes managed via new version route or Accept header

## Rate Limiting
- 100 requests/min per user, 1000 requests/min per tenant (Redis-based)
- Worker-to-GBP API calls respect Google quota; exponential backoff

## Security
- Input validation via Zod schema
- Audit log (userId, action, resourceId, payload digest)
- Role matrix: HQ Admin, HQ User, Store Manager, CS, Viewer

## Next Steps
- Define OpenAPI schema (`openapi.yaml`)
- Align with frontend service hooks
- Implement integration tests using MSW + supertest
