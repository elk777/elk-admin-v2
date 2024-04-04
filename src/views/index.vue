
<template>
    <div class="index-container">
        <div class="flex">
            <el-card shadow="hover" class="header-info">
                <div class="info-title">
                    <img class="title-image" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" alt="不要点哦">
                    <div class="title-size mt-12">
                        欢迎：{{ name }}
                    </div>
                    <div class="title-desc text-left opacity-6">一个人几乎可以在任何他怀有无限热忱的事情上成功。</div>
                    <div class="title-author text-right opacity-4">—— 查尔斯·史考伯</div>
                </div>
            </el-card>
            <el-card shadow="hover" class="header-introduce text-left ml-12">
                <template #header>
                    <div class="introduce-title title-size">🎎 项目简介</div>
                </template>
                <div class="opacity-6">
                    Vue-Elk-Admin「v2」 是一个基于 Vue2、webpack、Elementui的中后台基础模版，它使用了前沿的前端技术栈，基于mock实现的动态权限路由，开箱即用的中后台前端解决方案，也可用于学习参考。
                </div>
                <footer class="introduce-footer mt-12">
                    <a target="_blank" href="https://github.com/elk777/elk-admin-v2"><el-button type="primary">代码仓库</el-button></a>
                </footer>
            </el-card>
        </div>
        <div class="flex mt-12">
            <el-card shadow="hover" class="main-skills w50 text-left">
                <template #header>
                    <div class="title-size">🛠️ 主要技术栈</div>
                </template>
                <chart-view :option="option" ></chart-view>
            </el-card>
            <el-card shadow="hover" class="main-spec w50 ml-12 text-left">
                <template #header>
                    <div class="title-size ">👉🏻 特性</div>
                </template>
                <ul class="main-list">
                    <li class="mt-12">技术栈：使用Vue2技术栈：vue2.6 + webpack + vuex</li>
                    <li class="mt-12">UI组件库： Element UI，极致简洁的代码风格和清爽的页面设计，审美在线</li>
                    <li class="mt-12">CSS预处理器：scss预编译，优雅、轻量、易用</li>
                    <li class="mt-12">文件结构：遵循Vue官方文件结构，便于快速开发、阅读代码</li>
                    <li class="mt-12">权限路由：基于mock的动态路由能快速实现后端动态路由</li>
                    <li class="mt-12">请求函数：基于axios的完善的请求函数封装</li>
                    <li class="mt-12">常用工具：封装了常用的工具函数，如：时间格式化、表单初始化等</li>
                    <li class="mt-12">组件封装：封装了常用的组件，如：弹窗、分页、图标、虚拟列表等</li>
                </ul>
            </el-card>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Index',
    data () {
        return {
            option: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} {d}%'
                },
                legend: {
                    top: '0%',
                    left: 'center'
                },
                series: [
                    {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    padAngle: 5,
                    itemStyle: {
                        borderRadius: 10
                    },
                    label: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 10,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 1048, name: 'Vue' },
                        { value: 835, name: 'JavaScript' },
                        { value: 280, name: 'HTML' },
                        { value: 284, name: 'CSS' },
                        { value: 100, name: 'Other' }
                    ]
                    }
                ]
            }
        }
    },
    computed: {
        ...mapGetters([
            'name',
            'avatar',
            'roles'
        ])
    },
    mounted() {

    },
    methods: {
     
    }
}
</script>
<style lang="scss" scoped>
.index-container {
  padding: 15px;
  .flex {
    display: flex;
  }
  .ml-12 {
    margin-left: 12px;
  }
  .mt-12 {
    margin-top: 12px;
  }
  .w50 {
    width: 50%;
  }
  .title-size {
    font-size: 20px;
    font-weight: 500;
  }
  .opacity-4 {
    opacity: 0.4;
  }
  .opacity-6 {
    opacity: 0.6;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .header-info {
    width: 30%;
    min-width: 200px;
    .info-title {
        .title-image {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
        .title-text {
            font-size: 20px;
            font-weight: 500;
        }
        .title-desc {
            margin-top: 25px;
        }
        .title-author {
            font-size: 12px;
        }
    }
  }
  .header-introduce {
    width: 70%;
    min-width: 500px;
    .introduce-footer {
        float: right;
    }
  }
  .main-skills {
    width: 50%;
  }
  .main-spec {
    opacity: .8;
    font-size: 15px;
  }
}
</style>