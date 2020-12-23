const uri = 'base/users'

export default ({ request }) => ({
  user: {
    list: params => {
      return request.get(uri, { params: params })
    },
    create: params => {
      return request.post(uri, params)
    },
    update: params => {
      return request.put(uri, params)
    },
    delete: params => {
      return request.delete(uri + '/' + params.id, { params: params })
    },
    deleteBatch: params => {
      return request.delete(uri + '/' + params.ids, { params: params })
    },
    listByRoleId: params => {
      return request.get(uri + 'ByRoleId', { params: params })
    },
    setUserRole: params => {
      return request.put(uri + 'Role/set', params)
    },
    removeUserRole: params => {
      return request.put(uri + 'Role/del', params)
    },
    editPassword: params => {
      return request.put(uri + '/editPassword', params)
    },
    resetPassword: params => {
      return request.put(uri + '/resetPassword', params)
    }
  }
})
