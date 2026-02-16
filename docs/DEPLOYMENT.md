# Deployment Guide: Solaris V4 Ultimate 🚀🌐

The **Solaris Grid** is designed for seamless deployment on **Vercel**. Follow this guide to transition the Pratyaksh platform from a local forensic node to a global accountability matrix.

## 1. Vercel Integration
1.  **Push to GitHub:** Ensure your latest "Gold Standard" code is pushed to [github.com/akashrajput005/pratyaksh](https://github.com/akashrajput005/pratyaksh).
2.  **Import Project:** In the Vercel Dashboard, select **"Add New" -> "Project"** and import the `pratyaksh` repository.

## 2. Environment Variables 🔑
In the Vercel project settings, configure the following **Environment Variables**:

| Variable | Description | Value Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | Prisma Connection String | `postgresql://user:pass@host:5432/db` |
| `NEXT_PUBLIC_SERVER_URL` | Production Domain URL | `https://pratyaksh.vercel.app` |

> [!IMPORTANT]
> For the database, it is recommended to use a managed provider like **Neon** or **Supabase** for PostgreSQL.

## 3. Build & Deployment Settings
Vercel will automatically detect the **Next.js** framework. The default settings are optimized for Solaris:
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

## 4. Prisma Post-Install
To ensure the Prisma client is generated during the CI/CD pipeline, add weights to your `package.json` if necessary, or rely on Vercel's automatic generation. Ensure the `prisma generate` command runs if you've customized the schema.

## 5. Post-Deployment Verification
Once the build is live:
1.  **Coordinate Matrix:** Verify that the map loads correctly and pulls from your production database.
2.  **Forensic Uplink:** Test a report submission to ensure Base64 images are persisting in the production DB.
3.  **SSL Status:** Vercel automatically provides SSL, which is required for the **Pratyaksh Voice Protocol** (microphone access).

---

### **Launch Status: READY** 🛡️✨
Your grid is now ready for deployment. For further assistance with scaling or advanced forensic node and ward management, refer to the [System Architecture](./ARCHITECTURE.md) guide.
