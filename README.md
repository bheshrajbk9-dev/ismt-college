# ISMT College Website

A responsive Next.js website for the International School of Management and Technology (ISMT College), Nepal. Institutional details that have not been verified are clearly marked as editable placeholders. Enquiry forms are intentionally demonstration-only and do not send or store submissions.

## Features

- Home, About, Courses, Admissions, Student Services and Contact pages
- Responsive navigation with a mobile menu
- Searchable and filterable course-area directory
- Admissions FAQ accordion
- Accessible enquiry forms with client-side required-field checks and clear demo messaging
- Self-hosted Next.js production configuration for Ubuntu, PM2 and Nginx
- Optional backend API environment setting; no backend is required to render pages

## Technology

Next.js App Router, React, JavaScript/JSX (the supplied root layout remains TypeScript), CSS and Lucide icons. Node.js LTS and npm are suitable for local and server usage.

## Installation

Install Node.js LTS and npm, clone the repository, then run:

```bash
npm install
cp .env.example .env.local
```

`BACKEND_API_URL` is optional. Do not place credentials in source control.

## Local development

```bash
npm run dev
```

Open http://localhost:3000.

## Production build and startup

```bash
npm install
npm run build
npm start
```

The production server listens on port 3000. This is a Node.js server deployment; static export is not enabled.

## GitHub workflow

Create a separate GitHub repository named `ismt-college-nextjs-website`, add it as the `origin` remote, commit the project, and push your chosen branch. Keep `.env.local`, private keys and server credentials out of Git. This project is independent and does not reuse or modify any previous static-site repository.

## Azure Ubuntu deployment (Node.js, PM2 and Nginx)

1. Provision and secure an Ubuntu VM in the Azure architecture approved for your assignment. Install a supported Node.js LTS release, npm, Git, Nginx and PM2 (`npm install -g pm2`). Do not commit server secrets.
2. Clone this repository into a deployment directory and install dependencies with `npm ci` when a package lock exists, otherwise `npm install`.
3. Build the application with `npm run build`.
4. Start and persist the Node.js process with PM2:

   ```bash
   pm2 start ecosystem.config.cjs
   pm2 save
   pm2 startup
   ```

   Run the command printed by `pm2 startup` with the required system privileges. The app listens on `127.0.0.1:3000` via Nginx; keep port 3000 private to the VM.
5. Configure an Nginx virtual host for your verified domain, proxying HTTP requests to `http://127.0.0.1:3000`. Example server block (replace the domain and certificate paths after DNS and HTTPS setup):

   ```nginx
   server {
       listen 80;
       server_name example.edu.np www.example.edu.np;
       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
       }
   }
   ```

6. Validate and reload Nginx with `sudo nginx -t` and `sudo systemctl reload nginx`. Point Azure DNS records to the approved public endpoint; configure Application Gateway and VM Scale Set health probes/routing according to the course architecture.
7. After DNS resolves to the intended endpoint, configure HTTPS using Certbot and Let's Encrypt for the domain. Ensure inbound rules expose only required web traffic, and follow the instructor's guidance for VMSS, shared assets, deployment automation and scaling.
8. For updates, pull the intended branch, install dependencies when the lockfile changes, rebuild, then restart the app with `pm2 restart ismt-college`.

This repository does not create Azure resources, configure Azure DNS, issue certificates, deploy the application, or provide a private Flask API. For multiple web instances, configure the Azure gateway/load balancing and health checks; each instance runs the same Node.js application process.

## Content verification

Before publishing as an official institutional site, replace the clearly marked address, contact details, programme descriptions, admission criteria, office hours, map and editable vision/mission language with college-approved information. Verify image rights and all claims. The contact and admission forms are local demos only; connect them to an approved backend before accepting real submissions.
