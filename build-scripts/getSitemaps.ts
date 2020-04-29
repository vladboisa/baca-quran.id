import SurahConstant from './surah'
interface defaultSetting {
  changefreq: string;
  priority: number;
  lastmod: Date;
}
interface sitemapConfigs {
  path: string;
  routes?: string[];
  sitemaps?: string[];
  exclude?: string[];
  gzip: boolean;
  trailingSlash: boolean;
  defaults?: defaultSetting;
}

const getStaticRoutes = (): string[] => {
  const res: string[] = [
    '/',
    '/about',
    '/all-surah',
    '/asmaul-husna',
    '/ayat-kursi',
    '/daily-doa',
    '/tahlil',
    '/recommendation'
  ]
  return res
}

const getExlucedStatic = (): string[] => {
  return [].concat(getStaticRoutes()).concat([
    '/favorite',
    '/last-verse',
    '/settings'
  ])
}

const getSurahRoutes = (): string[] => {
  const res: string[] = []
  for (let i = 1; i < 115; i++) {
    res.push(`/${i}`)
  }
  return res
}

const getVerseRoutes = (surahIndex: number): string[] => {
  const res: string[] = []
  const surahObj = SurahConstant.find(item => item.index === surahIndex)
  if (surahObj) {
    for (let j = 1; j < surahObj.ayah_count + 1; j++) {
      res.push(`/${surahIndex}/${j}`)
    }
  }
  return res
}

// @ts-ignore
// eslint-disable-next-line
const getVerseSitemaps = (): sitemapConfigs[] => {
  const res: sitemapConfigs[] = []
  for (let i = 1; i < 115; i++) {
    const surahSitemap: sitemapConfigs = {
      path: `sitemap-verse-${i}.xml`,
      routes: getVerseRoutes(i),
      gzip: true,
      trailingSlash: true,
      exclude: getExlucedStatic(),
      defaults: {
        changefreq: 'weekly',
        priority: 1,
        lastmod: new Date()
      }
    }
    res.push(surahSitemap)
  }
  return res
}

const getSitemaps = (): sitemapConfigs[] => {
  const staticSitemap: sitemapConfigs = {
    path: 'sitemap-statics.xml',
    routes: getStaticRoutes(),
    gzip: true,
    trailingSlash: true,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    }
  }

  const surahSitemap: sitemapConfigs = {
    path: 'sitemap-surah.xml',
    routes: getSurahRoutes(),
    gzip: true,
    trailingSlash: true,
    exclude: getExlucedStatic(),
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    }
  }

  const res: sitemapConfigs[] = [staticSitemap, surahSitemap].concat([])
  return res
}

export default getSitemaps
