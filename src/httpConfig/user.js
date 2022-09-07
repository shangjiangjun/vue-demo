import { get } from './http'

const getUser = params => {
  return get('/user', params)
}

export {
  getUser
}