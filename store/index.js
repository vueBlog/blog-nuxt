export const state = () => ({
  logoText: process.env.NUXT_ENV_title || '',
  logoDescription: process.env.NUXT_ENV_description || '',
  userInfo: {
    id: '',
    name: '',
    email: '',
    admin: '',
    authority: 0,
  },
  userAgent: {
    system: '',
    browser: '',
    browserVersion: '',
    ip: '',
    city: '',
  },
})

export const getters = {
  signStatus(state) {
    return !!state.signIn.token
  },
}

export const mutations = {
  setAsideList(state, arr) {
    state.asideList = arr
  },
  setAuthorList(state, arr) {
    state.authorList = arr
  },
}

export const actions = {}
