This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
1. Install packages
```bash
pnpm i
```

2. Create MySQL database eg
```sql
create database user_manager
```

3. Update .env
```
DATABASE_URL="mysql://user:password@host:port/db_name"
```

4. Run migrations
```bash
npx prisma migrate dev
```

5. run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.