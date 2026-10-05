# Sun Star Inn Demo Backend

SQLite + Drizzle foundation for the Sun Star Inn PMS demo.

## Included

- Normalized motel schema and migrations
- Seed data for rooms, guests, reservations, companies, booking channels, maintenance, expenses, cash drops, employees, and tasks
- Booking channel commission configuration
- Business-day and maintenance work-order tables

## Run Locally

```bash
bun install
bun run db:migrate
bun run db:seed
```

This is a demo backend foundation. Supabase PostgreSQL, authenticated API routes, and Supabase Auth/RLS remain the next integration phase.
