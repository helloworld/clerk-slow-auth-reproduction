import { authMiddleware } from "@clerk/nextjs";

// Basic auth middleware for the reproduction case
// This ensures users are authenticated to measure token timing
export default authMiddleware({
  // All routes require authentication for this test
});

export const config = {
  matcher: [
    // Apply to all routes except static files and Next.js internals
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/(api|trpc)(.*)",
  ],
};
