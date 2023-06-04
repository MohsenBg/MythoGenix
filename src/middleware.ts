import { withAuth } from "next-auth/middleware";
import { unAuthMiddleware } from "./middleware/unAuthMiddleware";
import { authMiddleware } from "./middleware/authMiddleware";
import { NextResponse } from "next/server";
import {
  DASHBOARD_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  VERIFY_EMAIL_ROUTE,
} from "./constants/routeConfig";

export default withAuth(
  function middleware(req) {
    const middlewareQueue = [unAuthMiddleware, authMiddleware];
    for (const middlewareFunction of middlewareQueue) {
      const middlewareResult = middlewareFunction(req);
      if (middlewareResult.enableRedirection) {
        return NextResponse.redirect(middlewareResult.redirectUrl);
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: (_) => true,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard",
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/verify-email",
  ],
};
