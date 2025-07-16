# Clerk Slow Auth Reproduction

A minimal Next.js reproduction case for testing and measuring Clerk authentication timing issues.

## Purpose

This app measures the time it takes for Clerk's `getToken()` method to return a token, helping to identify potential performance issues with authentication.

## Getting Started

1. Set up your Clerk environment variables:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
   CLERK_SECRET_KEY=your_secret_key_here
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to see the timing measurements.

## What it measures

- Time taken for `getToken()` to resolve
- Displays truncated token and timing in milliseconds
- Useful for identifying authentication performance bottlenecks
