const uri = 'base/dicts'

export default ({ request }) => ({
  dict: {
    options: params => {
      return request.get(uri + '/options', { params: params })
    },
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
    }
  }
})
