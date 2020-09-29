import Api from '@/services/Api'
export default {
  savePassword (data) {
    return Api().post('save/password', data)
  },
  loadVault () {
    return Api().post('vault')
  },
  deleteItem (itemdetail) {
    return Api().post('vault/delete', itemdetail)
  },
  getCount () {
    return Api().get('vault/count')
  },
  updateFolder (folderid) {
    return Api().post('vault/folder', folderid)
  },
  getPassword (passwordid) {
    return Api().post('vault/password/getPassword', passwordid)
  },
  saveNote (noteData) {
    return Api().post('save/note', noteData)
  },
  saveFolder (folderData) {
    return Api().post('save/folder', folderData)
  }
}
