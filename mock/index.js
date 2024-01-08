const Mock = require("mockjs");

const login = require("./login");
const routers = require("./routers");
// const file = require("./file");
const styMenu = require("./system/menu");
const styUser = require("./system/user");
const styRole = require("./system/role");
const styDept = require("./system/dept");
const styDic = require("./system/dic");

Mock.setup({
	timeout: "200-600",
});

const mocks = [
    ...login,
    ...routers,
    // ...file,
    ...styMenu,
    ...styUser,
    ...styRole,
    ...styDept,
    ...styDic
]

for (const i of mocks) {
    Mock.mock( new RegExp(i.url), i.type | 'get', i.response);
}