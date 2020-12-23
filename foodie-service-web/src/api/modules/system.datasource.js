const uri = 'system/systemDatasources'

export default ({ request }) => ({
  datasource: {
    all: params => {
      return request.get(uri + '/all', { params: params })
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
