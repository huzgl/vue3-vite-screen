import request from '@/utils/request.js'

export const getVisualization = () => {
  return request({
    url: 'https://api.imooc-web.lgdsunday.club/api/visualization',
  })
}
