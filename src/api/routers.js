
import request from '@/libs/utils/request';

function getRouters() {
    return request({
        url: '/generateRouters',
        method: 'get'
    })
}

export {
    getRouters
}
