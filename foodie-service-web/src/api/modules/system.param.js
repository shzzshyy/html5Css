const uri = 'system/params'

export default ({ request }) => ({
  systemParam: {
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
    refreshCache: params => {
      return request.delete(uri + '/refreshCache', { params: params })
    }
  }
})
