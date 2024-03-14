import  axios from '@/libs/utils/request'

const moudulePath = '/platform/customlayout'

const api = {
  getDefaultLayout : moudulePath + '_getdefault',  // 获取默认方案
  getAllLayout : moudulePath + '_droplist',  // 获取所有方案
  setNewLayout : moudulePath + '_save',    //  方案保存并且替换旧方案
  setDefaultLayout : moudulePath + '_setdefault', // 设置替换方案
  delLayout : moudulePath + '_delete',  // 删除方案
}

// 获取领域字典分类
export function getDictDomainList (parameter) {
  return axios({
    url: "/dictCatalog/getDictDomainList",
    method: 'get',
    baseUrl: "mock",  // 2024 0306新增
    params: parameter
  })
}

// 根据领域获取数据字典 
// 参数：dictType
// 示例: /dictData/all?dictType=domain-jd
export function getDictDataByDictType (parameter) {
  return axios({
    url: "/dictData/all",
    method: 'get',
    baseUrl: "mock",  // 2024 0306新增
    params: parameter
  })
}

// 2-获取默认布局
export function getDefaultLayout (data) {
    return axios({
      url: api.getDefaultLayout,
      method: 'post',
      data: data,
    })
}

// 3-获取所有布局
export function getAllLayout (data) {
  return axios({
    url: api.getAllLayout,
    method: 'post',
    data: data
  })
}

// 4-保存新方案 替换旧方案
export function setNewLayout (parameter) {
  return axios({
    url: api.setNewLayout,
    method: 'post',
    data: parameter
  })
}

// 6-设置默认方案
export function setDefaultLayout (parameter) {
  return axios({
    url: api.setDefaultLayout,
    method: 'post',
    data: parameter
  })
}

// 7-删除方案
export function delLayoutInfo (parameter) {
    return axios({
      url: api.delLayout,
      method: 'post',
      data: parameter
    })
}

