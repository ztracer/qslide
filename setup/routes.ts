import type { RouteRecordRaw } from 'vue-router'

const repoBase = '/qslide'

export default function setupRoutes(routes: RouteRecordRaw[]) {
  routes.unshift(
    {
      path: `${repoBase}/:no(\\d+)`,
      redirect: to => ({
        path: `/${to.params.no}`,
        query: to.query,
      }),
    },
    {
      path: `${repoBase}/presenter/:no(\\d+)`,
      redirect: to => ({
        path: `/presenter/${to.params.no}`,
        query: to.query,
      }),
    },
    {
      path: `${repoBase}/:pathMatch(.*)*`,
      redirect: to => ({
        path: `/${Array.isArray(to.params.pathMatch) ? to.params.pathMatch.join('/') : to.params.pathMatch || '1'}`,
        query: to.query,
      }),
    },
  )

  return routes
}
