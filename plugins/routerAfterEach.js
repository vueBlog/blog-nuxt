import api from '@/api/index'
export default ({ app, store }) => {
  app.router.afterEach((to, from) => {
    app.$axios.$post(api.apiAddView, {
      from: from.fullPath,
      to: to.fullPath,
      client: 1,
    })
  })
}
