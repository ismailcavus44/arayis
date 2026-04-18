export const SITE_BRAND = 'Aray-İş'

/** Statik sayfa `<title>` son eki: "Sayfa Adı | Aray İş" */
export const SITE_META_TITLE_SUFFIX = 'Aray İş'

export function sitePageTitle(pageName: string): string {
  return `${pageName} | ${SITE_META_TITLE_SUFFIX}`
}

export const HIZMETLER_HUB_PATH = '/hizmetler'

export const HIZMETLERIMIZ_BASE = '/hizmetlerimiz'

export const EVDE_BAKIM_BASE = `${HIZMETLERIMIZ_BASE}/evde-bakim-personeli`
