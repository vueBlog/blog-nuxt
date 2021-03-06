import api from '@/api/index'

export const state = () => ({
  asideList: [],
  asideListLoading: false,
  asideAuthor: [],
  asideAuthorLoading: false,
})

export const getters = {
  getFirstAuthor(state) {
    return state.asideAuthor.length ? state.asideAuthor[0].authorId : 0
  },
}

export const mutations = {
  setAside(state, value) {
    state.asideList = value
  },
  setAsideListLoading(state, value) {
    state.asideListLoading = value
  },
  setAsideAuthor(state, value) {
    state.asideAuthor = value
  },
  setAsideAuthorLoading(state, value) {
    state.asideAuthorLoading = value
  },
}

export const actions = {
  async getAsideList({ commit, state }) {
    commit('setAsideListLoading', true)
    const result = await this.$axios.get(api.getAside)
    if (result.isok) {
      commit('setAsideListLoading', false)
      commit('setAside', result.data.list)
      return result.data.list
    }
  },
  async getAuthorList({ commit, state }) {
    commit('setAsideAuthorLoading', true)
    const result = await this.$axios.get(api.getAsideAuthor)
    if (result.isok) {
      commit('setAsideAuthorLoading', false)
      commit('setAsideAuthor', result.data)
      return result.data
    }
  },
}
