import {
  VERIFY_EMAIL_ROUTE,
  DASHBOARD_ROUTE,
  SIGN_IN_ROUTE,
} from "@/constants/routeConfig";
import { RedirectionOptions } from "@/interfaces/IRedirection";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextURL } from "next/dist/server/web/next-url";

const protectedRoutes: RegExp[] = [new RegExp(`^${DASHBOARD_ROUTE}(/.*)?$`)];

export function requireAuthenticatedAndVerified(
  req: NextRequestWithAuth
): RedirectionOptions {
  const { pathname } = req.nextUrl;

  for (const route of protectedRoutes) {
    if (pathname.match(route)) {
      const url: NextURL = req.nextUrl.clone();

      if (!req.nextauth.token) {
        url.pathname = SIGN_IN_ROUTE;
        return {
          enableRedirection: true,
          redirectUrl: url,
        };
      }

      //@ts-ignore
      if (!req.nextauth.token.email.verified) {
        url.pathname = VERIFY_EMAIL_ROUTE;
        return {
          enableRedirection: true,
          redirectUrl: url,
        };
      }
    }
  }

  return {
    enableRedirection: false,
    redirectUrl: null,
  };
}
