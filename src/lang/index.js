
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '@/store';

Vue.use(VueI18n);
// 引入中英js文件
import Chinese from './zh';
import English from './en';

// 创建i18n实列
const i18n = new VueI18n({
    locale: store.getters.languageType,  // 设置i18n语言
    messages: {
        'zh-cn': Chinese,
        'en': English,
    },
    silentFallbackWarn: true,  // 设置为true后，在组件内使用时在浏览器不会报警告
})

export default i18n;