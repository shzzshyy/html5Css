const uri = 'base/dictVals'

export default ({ request }) => ({
  dictVal: {
    options: params => {
      return request.get(uri + '/options/' + params.dictCode, { params: params })
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
    },
    sort: params => {
      return request.put(uri + '/sort/' + params.up, params)
    }
  }
})
