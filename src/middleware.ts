import { withAuth } from "next-auth/middleware";
import { requireUnauthenticated } from "./middleware/requireUnauthenticated";
import { requireAuthenticatedAndVerified } from "./middleware/requireAuthenticatedAndVerified";
import { requireAuthenticatedButNotVerified } from "./middleware/requireAuthenticatedButNotVerified";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const middlewareQueue = [
      requireUnauthenticated,
      requireAuthenticatedAndVerified,
      requireAuthenticatedButNotVerified,
    ];
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
