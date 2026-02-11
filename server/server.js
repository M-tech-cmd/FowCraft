import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import { inngest, functions } from './inngest/index.js';
import { serve } from "inngest/express";

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Root route - this confirms your server is alive
app.get('/', (req, res) => {
    res.status(200).send('FowCraft Server is Live and Running!');
});

// Inngest Webhook route
app.use("/api/inngest", serve({ client: inngest, functions }));

// Local development only: Vercel ignores this block in production
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Local server running on port ${PORT}`));
}

// THE MOST IMPORTANT LINE: This lets Vercel run your app
export default app;