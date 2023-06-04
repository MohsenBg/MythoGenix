import { NextURL } from "next/dist/server/web/next-url";

interface RedirectionConfig {
  enableRedirection: true;
  redirectUrl: NextURL;
}

interface NoRedirectionConfig {
  enableRedirection: false;
  redirectUrl: null;
}

export type RedirectionOptions = RedirectionConfig | NoRedirectionConfig;
