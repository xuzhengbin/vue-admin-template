import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/index/query',
    method: 'get',
    params
  })
}
