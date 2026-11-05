/** The server-hosted site uses root URLs; the Pages build supplies its repository path. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const isStaticSite = process.env.NEXT_PUBLIC_STATIC_SITE === 'true';
export const siteUrl = isStaticSite
  ? 'https://onlyoneAlexia.github.io/choosing-abstinence/'
  : 'https://choosing-abstinence-alexia.timidan-x.chatgpt.site/';
export const creatorDashboardUrl = 'https://choosing-abstinence-alexia.timidan-x.chatgpt.site/analytics';
export function sitePath(path: string) {
  return `${basePath}${path}`;
}
