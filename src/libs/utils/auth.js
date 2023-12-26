// 认证信息
import Cookis from 'js-cookie';

const TokenKey = 'elk-token'

function setToken (token) {
    return Cookis.set(TokenKey, token)
}

function getToken () {
    return Cookis.get(TokenKey)
}

function removeToken () {
    return Cookis.remove(TokenKey)
}

export {
    setToken,
    getToken,
    removeToken
}