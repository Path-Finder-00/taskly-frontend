import axios from 'axios'

import { getStoredAuthToken, removeStoredAuthToken } from './authToken'
import history from '@/browserHistory'

const defaultParams = {
    baseUrl: 'http://localhost:3001',
    headers: () => ({
        'Content-Type': 'application/json'
    })
}

const api = (method, url, variables, headers = defaultParams.headers(), type = undefined) =>
    new Promise((resolve, reject) => {
        axios({
            url: `${defaultParams.baseUrl}${url}`,
            method,
            headers: Object.assign(headers, {Authorization: getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined}),
            params: method === 'get' ? variables : undefined,
            data: method !== 'get' ? variables : undefined,
            responseType: type
        }).then(
            response => {
                resolve(response.data)
            },
            error => {
                if (error.response) {
                    if (error.response.data.error.code === 'INVALID_TOKEN') {
                        removeStoredAuthToken()
                        history.pushState('/login')
                    } else {
                        reject(error.response.data.error);
                    }
                } else {
                    reject(defaultParams.error);
                }
            }
        )
    })

export default {
    get: (...args) => api('get', ...args),
    post: (...args) => api('post', ...args),
    put: (...args) => api('put', ...args),
    patch: (...args) => api('patch', ...args),
    delete: (...args) => api('delete', ...args)
}