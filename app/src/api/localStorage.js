export function storeToken(value) {
    if (!JSON.parse(localStorage.getItem('token'))) {
        const token = localStorage.setItem('token', JSON.stringify(value))
        return token
    }

}
export function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))
    return token
}
export function removeToken() {
    if (JSON.parse(localStorage.getItem('token'))) {
        const token = localStorage.removeItem('token')
        return token
    }

}