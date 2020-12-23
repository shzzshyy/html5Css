const uri = 'base/resources'

export default ({ request }) => ({
  resource: {
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
    sort: params => {
      return request.put(uri + '/sort/' + params.up, params)
    },
    listByRoleId: params => {
      return request.get(uri + '/role/' + params.roleId, { params: params })
    },
    saveResourcesRole: params => {
      return request.put(uri + '/role', params)
    },
    listMenusByUser: params => {
      return request.get(uri + '/user', { params: {} })
    },
    contentTree: params => {
      return request.get(uri + '/content', { params: {} })
    }
  }
})
