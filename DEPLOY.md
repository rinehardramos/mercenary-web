# Vercel Deployment

## Prerequisites
- Vercel CLI: `npm i -g vercel`
- Vercel account with project created

## Deployment Steps

### 1. Login to Vercel
```bash
vercel login
```

### 2. Link Project
```bash
cd src/mercenary/web
vercel link
```

### 3. Set Environment Variables
```bash
vercel env add NEXT_PUBLIC_API_URL
# Enter: https://api.mercs.tech
```

### 4. Deploy
```bash
vercel --prod
```

## Environment Variables

| Variable | Production | Preview |
|----------|------------|---------|
| NEXT_PUBLIC_API_URL | https://api.mercs.tech | http://localhost:8001 |

## Domains

Production domain will be configured in Vercel dashboard:
- Primary: `mercs.tech`
- Alias: `www.mercs.tech`

## CI/CD

Connected to GitHub. Auto-deploys on:
- `main` branch → Production
- PRs → Preview deployments

## Build Settings

- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
