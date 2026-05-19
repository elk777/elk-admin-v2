<template>
    <div>
        <img style="width: 100%;" id="tokenimg" ref="tokenimg" />
    </div>
</template>
<script>
// import { ACCESS_TOKEN } from '@/store/mutation-types';
const ACCESS_TOKEN = 'ACCESS_TOKEN'
import Vue from 'vue'
    export default {
        name:"tokenimg",
        props: {
            authSrc: {
                type: String,
                required: false,
                default: ''
            }
        },
        data() {
            return {
                property: 'value',
            };
        },
        created( ) {
        },
        mounted() {
            this.getImg();
            // console.log("我的图片",this.authSrc)
            // console.log("我的token",Vue.ls.get(ACCESS_TOKEN))
        },
        methods: {
            getImg() {
                // 获取需要携带token,
                Object.defineProperty(Image.prototype, 'authsrc', {
                    writable: true,
                    enumerable: true,
                    configurable: true
                })
                let img = this.$refs.tokenimg;
                let request = new XMLHttpRequest();
                request.open('get', this.authSrc, true)
                // 携带请求头
                // request.setRequestHeader( 'X-USER-TOKEN',Vue.ls.get(ACCESS_TOKEN));
                request.setRequestHeader( 'X-USER-TOKEN',ACCESS_TOKEN);
                request.responseType = 'arraybuffer';
                request.onreadystatechange = e => {
                    if( request.readyState === XMLHttpRequest.DONE && request.status == 200) {
                        let arr=  []
                        arr.push(request.response)
                        let url = window.URL.createObjectURL( new Blob(arr))
                        img.src = url
                        img.onload = () => {
                            URL.revokeObjectURL( img.src)
                        }
                    }
                }
                request.send(null)
            }
        },
        // 监听属性
        watch: {
            authSrc: {
                deep: true,
                handler(n, o) {
                    if(n) {
                        this.getImg()
                    }
                }
            }
        }
    }
</script>