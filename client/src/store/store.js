import Vue from 'vue'
import Vuex from 'vuex'
import DataHandler from '@/services/DataHandlers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: null,
    logged: false,
    home: true,
    password: false,
    addPassword: false,
    currentPage: 'home',
    currentOverlay: null,
    closeOverlay: null,
    vaultData: null,
    panel: null,
    passwordcount: 0,
    cardcount: 0,
    notecount: 0,
    drawer: false,
    mini: true,
    snackbar: {
      model: false,
      content: null,
      color: null,
      timeout: 5000
    },
    passwordForm: false,
    folders: null,
    addPass: false,
    addNote: false,
    addFold: false,
    formTitle: ''
  },
  mutations: {
    toggleState: (store, payload) => {
      store[payload.state] = !store[payload.state]
      store.formTitle = payload.formTitle
    },
    toggleLogState (store) {
      store.logged = !store.logged
    },
    open: (store, payload) => {
      store[store.currentOverlay] = false
      store[store.currentPage] = false
      store[payload] = true
      store.currentPage = payload
    },
    overlay: (store, payload) => {
      store[store.currentOverlay] = null
      store[payload] = true
      store.currentOverlay = payload
    },
    loadVault: (store, payload) => {
      store.vaultData = payload
      store.panel = Array.from(Array(store.vaultData.length), (_, index) => index)
      store.folders = []
      for (var i in store.vaultData) {
        store.folders.push(store.vaultData[i].folder_name)
      }
      console.log('loaded')
    },
    updateCount: (store, payload) => {
      store.passwordcount = payload.passwordcount
      store.notecount = payload.notecount
    },
    updateFolder: (store, payload) => {
      Vue.set(store.vaultData, payload.folderindex, payload.folder)
    },
    navDrawerMini: (store) => {
      store.mini = !store.mini
    },
    navDrawer: (store) => {
      store.drawer = !store.drawer
    },
    panel: (store) => {
    }
  },
  actions: {
    loadVault: async ({commit}) => {
      console.log('loading')
      var vaultData = await DataHandler.loadVault()
      console.log(vaultData)
      commit('loadVault', vaultData.data)
    },
    getCount: async ({commit}) => {
      var counts = await DataHandler.getCount()
      counts = counts.data[0]
      commit('updateCount', counts)
    },
    deleteItem: async ({dispatch}, payload) => {
      console.log(payload)
      await DataHandler.deleteItem(payload)
        .then(() => {
          dispatch('updateFolder', payload.folderIndex)
          console.log('c')
          return true
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    },
    updateFolder: async ({state, commit, dispatch}, payload) => {
      await DataHandler.updateFolder({folderid: state.vaultData[payload].id})
        .then((folder) => {
          commit('updateFolder', {folderindex: payload, folder: folder.data})
          dispatch('getCount')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
