# Developer Setup 🛠️

Follow these steps to initialize the **Solaris Ultra** environment.

## 1. Prerequisites
- Node.js 20+
- npm 9+
- A running MongoDB/PostgreSQL instance (optional for local dev, we use mock actions by default).

## 2. Environment Configuration
Create a `.env` file in the root directory:
```env
DATABASE_URL="your-database-url"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
```

## 3. Installation
```bash
# Install dependencies
npm install

# Build the Solaris Shaders
npm run build
```

## 4. Development Mode
```bash
npm run dev
```
Navigate to `http://localhost:3000`.

## 5. Verification Protocol
To test the **Integrity Grid**:
1. Open the **Pratyaksh Lens** (Reporting drawer).
2. Upload a photo taken with a GPS-enabled camera.
3. Observe the "Grid Integrity" status update in real-time.
4. Check the console for forensic logs from `exif-guard`.

---

> [!NOTE]
> For production deployment, ensure the `NEXT_PUBLIC_SERVER_URL` is set to your domain to allow the browser to correctly identify reporting locality.
