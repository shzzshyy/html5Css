export default ({ request }) => ({
  sysLogin: params => {
    console.log(params)
    return request({
      url: '/authentication/login',
      method: 'post',
      params: params
    })
  },
  sysLogout: params => {
    return request.get('/authentication/logout', { params: params })
  },
  captchaValidate: params => {
    return request.get('/captcha/validate/' + params.requestId + '/' + params.code, { params: params })
  }
})
