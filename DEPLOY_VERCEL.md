# Deploying Taksh — Crafted Veg Experience to Vercel

This repo is configured to deploy as a single Vercel project:

* **Frontend** — React app in `/frontend` built with `yarn build` and served as a static SPA.
* **Backend** — FastAPI in `/api/index.py` mounted as a Python serverless function. All `/api/*` requests are rewritten to it.
* **Database** — MongoDB Atlas (free tier is enough). The local Emergent stack uses a local Mongo; on Vercel you must use Atlas.

The local Emergent dev workflow is **unchanged** — `/backend/server.py` keeps running under supervisor. Vercel only uses `/api/index.py`.

---

## 1. One-time setup

### 1a. Create a MongoDB Atlas cluster
1. Go to https://www.mongodb.com/cloud/atlas, create a free **M0** cluster.
2. Add a database user (`takshUser`) and a strong password.
3. Network access → "Allow access from anywhere" (`0.0.0.0/0`).
4. Click **Connect → Drivers → Python** and copy the connection string. Replace `<password>` with your actual password and add a database name at the end. Example:
   ```
   mongodb+srv://takshUser:YourPass@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

### 1b. Push code to GitHub
```bash
cd /app
git init
git add .
git commit -m "Taksh fullstack — vercel ready"
git branch -M main
git remote add origin https://github.com/<you>/taksh-website.git
git push -u origin main
```

---

## 2. Deploy to Vercel

1. Go to https://vercel.com → **Add New → Project**.
2. Import the GitHub repo. Vercel auto-detects `vercel.json`.
3. **Root Directory** — leave as `.` (the repo root).
4. **Framework Preset** — `Other` (the `vercel.json` overrides build commands).
5. Set **Environment Variables** (Project Settings → Environment Variables):

   | Name | Value | Environments |
   |---|---|---|
   | `MONGO_URL` | your Atlas connection string from step 1a | Production + Preview + Development |
   | `DB_NAME` | `taksh_prod` | Production + Preview + Development |
   | `CORS_ORIGINS` | `*` (or your Vercel domain) | Production + Preview + Development |
   | `REACT_APP_BACKEND_URL` | *(leave empty)* | Production + Preview + Development |

   > `REACT_APP_BACKEND_URL` must be **empty** so the frontend calls `/api/...` on the same origin (Vercel routes this to the Python function).

6. Click **Deploy**.

Vercel will:
- Run `yarn install && yarn build` in `frontend/`.
- Detect `api/index.py` and bundle it as a Python serverless function (using `requirements.txt` at repo root).
- Wire `/api/*` → the function via `vercel.json` rewrite.
- Serve `frontend/build/` as static SPA fallback.

---

## 3. Verify

After the first deploy:

```bash
# Replace with your actual Vercel URL
export URL=https://taksh-crafted.vercel.app

curl $URL/api/                               # → {"message":"Taksh Crafted Veg Experience API"}
curl -X POST $URL/api/reservations \
  -H "Content-Type: application/json" \
  -d '{"name":"Aarav","phone":"+919876543210","date":"2026-03-01","time":"19:30","guests":4}'
```

Open `$URL/` in a browser — full website loads, navigate to `/reservations`, submit a booking, see the gold success animation.

---

## 4. Custom domain (optional)

Project Settings → **Domains** → add `taksh.in` (or your domain). Vercel handles HTTPS + DNS instructions automatically.

---

## 5. What changed vs the Emergent build

| File | Purpose |
|---|---|
| `/api/index.py` | Vercel serverless FastAPI (PyMongo sync, lazy lru_cache connection). |
| `/requirements.txt` | Top-level Python deps used **only** by Vercel for the function build. |
| `/vercel.json` | Build command, output dir, `/api/*` rewrite, function config. |
| `/.vercelignore` | Excludes `/backend`, tests, memory from the deploy bundle. |

`/backend/server.py` is **untouched** — Emergent supervisor keeps using it locally.

---

## 6. Troubleshooting

- **"MongoServerSelectionTimeoutError"** → Atlas IP allowlist isn't `0.0.0.0/0`, or `MONGO_URL` has wrong password.
- **`/api/...` returns the React index.html** → `vercel.json` rewrite missing or function build failed; check the **Functions** tab in the Vercel dashboard for build logs.
- **`Module not found: pymongo`** → top-level `/requirements.txt` is missing or wasn't picked up; redeploy with the Vercel CLI: `vercel --prod`.
- **CORS error** → set `CORS_ORIGINS` env var to your Vercel domain (e.g. `https://taksh-crafted.vercel.app`) instead of `*`, then redeploy.
- **Reservation submit hangs in production** → `REACT_APP_BACKEND_URL` was set to a value; clear it (must be empty) so the frontend uses relative `/api/...`.

---

## 7. Cost note

- Vercel **Hobby** plan: free, perfect for launch. 100 GB bandwidth/month, 100 GB-hours of function execution.
- MongoDB **Atlas M0**: free, 512 MB storage. Enough for 50k+ reservations.

Total monthly cost at launch: **₹ 0**.
