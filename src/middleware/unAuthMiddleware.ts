import {
  HOME_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "@/constants/routeConfig";
import { RedirectionOptions } from "@/interfaces/IRedirection";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextURL } from "next/dist/server/web/next-url";

const protectedRoutes: RegExp[] = [
  new RegExp(`^${SIGN_IN_ROUTE}(/.*)?$`),
  new RegExp(`^${SIGN_UP_ROUTE}(/.*)?$`),
];

export function unAuthMiddleware(req: NextRequestWithAuth): RedirectionOptions {
  const { pathname } = req.nextUrl;
  for (const route of protectedRoutes) {
    if (pathname.match(route) && req.nextauth.token) {
      const url: NextURL = req.nextUrl.clone();
      url.pathname = HOME_ROUTE;
      return {
        enableRedirection: true,
        redirectUrl: url,
      };
    }
  }

  return {
    enableRedirection: false,
    redirectUrl: null,
  };
}
