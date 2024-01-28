import api from '@/shared/utils/api'

const baseUrl = '/api/projects'

const getUserProjects = async () => {
    const response = api.get(baseUrl)

    return response
}

export default { getUserProjects }

