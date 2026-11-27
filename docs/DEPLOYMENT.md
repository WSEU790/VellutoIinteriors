# Deployment (VPS)

Tested target: Ubuntu 22.04/24.04 with Node.js 20+ and Nginx. Any Linux VPS works.

## 1. Server preparation

```bash
# Node.js 22 LTS (via NodeSource) and Nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
sudo useradd --system --create-home --home-dir /srv/velluto velluto
```

## 2. Get the code and build

```bash
sudo -u velluto -i
git clone https://github.com/WSEU790/VellutoIinteriors.git app && cd app
cp .env.example .env && nano .env     # set SITE_URL, VITE_SITE_URL, NODE_ENV=production, contact details, …
npm ci
npm run build
npm prune --omit=dev                  # optional: drop dev dependencies after the build
```

> `VITE_*` variables are baked into the front end **at build time**. Rebuild after changing them.

Key production `.env` values:

```
NODE_ENV=production
PORT=3001
SITE_URL=https://www.your-domain.com
VITE_SITE_URL=https://www.your-domain.com
CORS_ORIGINS=                # empty when the API and site share one origin
STORAGE_DIR=/srv/velluto/storage
TRUST_PROXY=loopback
```

## 3. Run as a service (systemd)

```bash
sudo cp deploy/velluto.service /etc/systemd/system/velluto.service
sudo systemctl daemon-reload
sudo systemctl enable --now velluto
sudo systemctl status velluto
curl -s localhost:3001/api/health
```

## 4. Nginx and HTTPS

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/velluto
sudo sed -i 's/your-domain.com/<actual-domain>/g' /etc/nginx/sites-available/velluto
sudo ln -s /etc/nginx/sites-available/velluto /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 5. Updating

```bash
sudo -u velluto -i
cd app && git pull && npm ci && npm run build && exit
sudo systemctl restart velluto
```

## 6. Backups

Back up `STORAGE_DIR`, which holds the leads and uploaded images. With PostgreSQL, also back up the database (`pg_dump`). Lead data contains personal information, so keep backups encrypted and access-restricted.

## Optional: PostgreSQL

```bash
sudo apt-get install -y postgresql
sudo -u postgres createuser velluto -P
sudo -u postgres createdb velluto -O velluto
psql "postgres://velluto:<password>@localhost:5432/velluto" -f db/schema.sql
# .env
LEAD_STORAGE=postgres
DATABASE_URL=postgres://velluto:<password>@localhost:5432/velluto
```
