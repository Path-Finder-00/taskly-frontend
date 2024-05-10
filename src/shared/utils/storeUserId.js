export const getStoredUserId = () => sessionStorage.getItem('loggedTasklyAppUserId')

export const storeUserId = id => sessionStorage.setItem('loggedTasklyAppUserId', id)

export const removeStoredUserId = () => sessionStorage.removeItem('loggedTasklyAppUserId')
