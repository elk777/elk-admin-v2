// 路由权限模块
import { constantRoutes } from "@/router"
import { getRouters } from '@/api/routers';
import Layout from '@/layout/index'

const defaultState = () => {
    return {
        routers: [],
        addRouters: [],
        sidebarRouters: [],
    }
}

const state = defaultState();

const mutations = {
    SET_ROUTERS: (state, routers) => {
        state.addRouters = routers;
        state.routers = constantRoutes.concat(routers);
    },
    SET_SIDEBARROUTERS: (state, routers) => {
        state.sidebarRouters = constantRoutes.concat(routers);
    }
}

const actions = {
    async GenerateRouter({ commit }) {
        try {
            const routers = await getRouters();
            const rdata = JSON.parse(JSON.stringify(routers.data));
            const sdata = JSON.parse(JSON.stringify(routers.data));
            const formatRdata = formatRouters(rdata);
            const formatSdata = formatRouters(sdata);
            commit('SET_ROUTERS', formatRdata);
            commit('SET_SIDEBARROUTERS', formatSdata);
            return formatRdata;
        } catch (err) {
            return new Error(err)
        }
    }
}

/* 
    将后端路由变成前端路由对象
    遍历后端路由对象，改造成vue-router路由对象
    后端：{
        id: 1,
        title: '系统管理',
        name: 'system',
        path: '/system',
        children:[
            {
                id:2,
                title: '菜单管理',
                name:'menu',
                path:'system/menu',
                link: '/system/menu'
            },
        ]
    }
*/
const formatRouters = function (routers) {
    let routerObj = {
        path: '',
        component: '',
        name: '',
        meta: {},
        children: [],
    }
    return routers.map((router, i) => {
        routerObj = {
            path: router.link ? router.link : router.path,
            name: router.name,
            isLink: router.isLink || null,
            meta: {
                title: router.title,
                icon: router.icon || '',
                noCache: router.noCache || false,
                affix: router.affix || false,
            }
        }
        if (router.link) {
            routerObj.component = loadView(router.link)
        } else {
            routerObj.component = Layout
        }
        if (router.children && router.children.length) {
            routerObj.children = formatRouters(router.children)
            routerObj.redirect = router.redirect; 
        }
        return routerObj;
    })
}
// 路由懒加载配置
const loadView = function (view) {
    return (resolve) => require([`@/views${view}/index`], resolve)
}

export default {
    state,
    mutations,
    actions
}