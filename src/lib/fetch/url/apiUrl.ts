function getUrlWithRoute(route: string): string {
  return process.env.NEXT_PUBLIC_URL?.toString() + route;
}

function getUrl(): string {
  return process.env.NEXT_PUBLIC_URL?.toString() + "";
}

export { getUrl, getUrlWithRoute };
