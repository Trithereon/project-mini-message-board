# Deployment Checklist

## Database

- Each project needs its own role (or db_user) and db.
- Dev:

```bash
# Open Postgres prompt as current linux user
psql

# Create a login role with a password, basic rights only
CREATE ROLE myapp LOGIN PASSWORD 'generated password (openssl rand -hex 32 is good)';

# Create a database owned by that role
CREATE DATABASE myapp OWNER myapp;

# Block public access to schema so only the owner can use it
REVOKE ALL ON DATABASE myapp FROM PUBLIC;
```

- Prod:

```bash
# Open Postgres prompt in its docker container
docker compose exec postgres psql -U postgres

# Create role, database and revoke public access as with dev mode.
```

## Environment Variables

- Edit .env-example to match project details

```env
DB_USER=<alphanumeric project name>
DB_PASS=<use `openssl rand -hex 32`>
DB_NAME=<same as DB_USER>
DB_HOST=<localhost is default>
DB_PORT=<5432>
DB_URL=postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}
# Run (set -a; source .env; echo "$DB_URL") with parentheses
# to evaluate DB_URL and show it in terminal.

# Node
HOST=<localhost is default>
PORT=<unique port per project>
```

- `chmod 600 .env`
- Include `.env` in `.gitignore`

## Caddyfile

- Add reverse-proxy entry
- Follow example of the previous project

## cloudflare-ddns

- Add subdomain
- Pick a short name

## Github

- Install github app (webhook) to project repo
- This connects the github repo to the local git repo in `~/deploys`

## Docker

- Edit Dockerfile as needed and update port
- Edit `docker-compose.yaml` as needed.

## Local files

```bash
cd ~/deploys
git clone git@github.com:Trithereon/<repo>.git
```

## Update local files once deployed

1. Clone the repo
2. Commit changes
3. `git push origin main`
4. Github webhook is triggered (only by pushes to main)
5. Local webhook service triggers deploy-app.sh, which does the following:

```bash
cd "$APP_DIR"
git pull --ff-only
docker compose up -d --build
```
