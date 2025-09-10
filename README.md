# Quiz Builder

## Getting Started

### 1. Clone the repository

```bash
git clone https://https://github.com/OzzeY72/quiz-builder.git
cd quiz-builder
```

### 2. Install dependencies

Backend (NestJS + Prisma):

```bash
cd backend
npm install
```

Frontend (Next.js):

```bash
cd ../frontend
npm install
```

### 3. Environment variables

In the backend folder, create a `.env` file with the following content:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/db?schema=public"
```

Replace user, password, db with your PostgreSQL credentials and database name.

In the frontend folder, create a `.env` file with the following content (your backend link):

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

### 4. Run the backend

```bash
cd backend
npm run prisma:migrate
npm run prisma:generate
npm run start:dev
```

### 5. Run the frontend

```bash
cd frontend
npm run dev
```

[Database scheme](./Database.md)
