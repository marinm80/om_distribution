# Setup

## Local Development

### Prerequisites
- Node.js 20+
- PostgreSQL 15 running on `localhost:5432`

### Backend

```bash
cd backend
npm install

# Create .env (copy from .env.example and fill in)
cp .env.example .env
```

Required `.env` variables:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/om_markets
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Run DB migrations:
```bash
psql -U postgres -d om_markets -f database/001_initial_schema.sql
psql -U postgres -d om_markets -f database/002_seed_data.sql
psql -U postgres -d om_markets -f database/003_indexes.sql
```

Start backend:
```bash
npm run dev   # nodemon
```

### Frontend

```bash
cd frontend
npm install
npm run dev   # Vite dev server at http://localhost:5173
```

`VITE_API_URL` is optional locally — defaults to `http://localhost:5000/api`.

---

## Production (Docker)

### Required `.env` at project root

```
POSTGRES_DB=om_markets
POSTGRES_USER=postgres
POSTGRES_PASSWORD=secure_password

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

FRONTEND_URL=https://yourdomain.com
VITE_API_URL=https://api.yourdomain.com/api
```

`VITE_API_URL` is baked into the frontend image at build time (Vite env var).

### Build & run

```bash
docker compose up -d --build
```

### First run: apply migrations

```bash
docker exec -it om-distribution-backend \
  node -e "
    const pool = require('./src/config/pool');
    const fs = require('fs');
    ['001_initial_schema','002_seed_data','003_indexes'].forEach(async f => {
      const sql = fs.readFileSync('./database/' + f + '.sql','utf8');
      await pool.query(sql);
      console.log(f + ' done');
    });
  "
```

Or connect directly with psql and run the files in `backend/database/`.

---

## Admin Credentials (seed)

Default admin from seed: `admin@omdistribution.com` — the password hash in the seed file is a placeholder. Create a real admin user via:

```bash
# From backend directory
node -e "
  const bcrypt = require('bcryptjs');
  bcrypt.hash('yourpassword', 10).then(h => console.log(h));
"
```

Then update the users table with the real hash.
