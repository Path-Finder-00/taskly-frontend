import api from '@/shared/utils/api'

const baseUrl = '/api/logout'

const logout = async () => {
  const response = api.delete(baseUrl)

  return response
}

export default { logout }