const uri = 'base/roles'

export default ({ request }) => ({
  role: {
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
    listByUserId: params => {
      return request.get(uri + 'ByUserId', { params: params })
    }
  }
})
