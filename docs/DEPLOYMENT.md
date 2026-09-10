# Deployment Guide

The application is structured as a standard Next.js App Router project and is optimized for deployment on Vercel.

## 1. Repository Preparation
Ensure all changes are committed and pushed to your GitHub repository (`Harsh-Gopal/Harsh-Gopal`).
Make sure `npm run build` succeeds locally before attempting deployment.

## 2. Vercel Import
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New Project**.
3. Import the `Harsh-Gopal/Harsh-Gopal` repository from GitHub.

## 3. Build Settings
Vercel should automatically detect Next.js. Verify the following defaults:
- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 4. Environment Variables
No custom environment variables are required for the base Arcade or Games to function. 

## 5. Deployment
Click **Deploy**. Vercel will install dependencies, build the application, and provision an SSL certificate.

## 6. Custom Domain (Optional)
If you wish to use a domain like `harshgopal.dev`:
1. In Vercel, go to Project Settings > Domains.
2. Add your domain (`harshgopal.dev`).
3. Follow the DNS configuration instructions provided by Vercel (typically pointing an A record to Vercel's IP or a CNAME for subdomains).

## 7. Updating the README
Once your application is live on Vercel or your custom domain, update the placeholder URL in `README.md` at the root of the project:

```html
<a href="https://your-actual-deployed-url.vercel.app/arcade">
  <img src="https://img.shields.io/badge/%E2%96%B6%20ENTER%20THE%20ARCADE-00E5FF?style=for-the-badge&logoColor=black&color=050505&labelColor=00E5FF" alt="Enter the Arcade" />
</a>
```

Commit this change to update your GitHub profile with the live, playable arcade link.
