# Luapula API

## Overview

This API supports:

- Session based authentication
- User management
- Product management with filters (type, tags, specificities)
- Sending selected products by email to the admin

## Tech Stack

- NestJS
- TypeORM
- MariaDB

## Setup

```bash
git clone https://github.com/musanzi/luapula-api.git
cd luapula-api
pnpm i
cp .env.example .env
# Edit .env with DB + email config
pnpm dev
```
