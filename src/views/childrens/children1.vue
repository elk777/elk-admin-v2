
<template>
  <div>
    <div>儿子组件1</div>
    <gran1 v-bind="$attrs" v-on="$listeners"></gran1>
  </div>
</template>

<script>
import gran1 from './components/gran1.vue';
export default {
  name: 'Children1',
  components: {
    gran1
  },
  props: {
    isShow: {
        type: Boolean
    }
  },
  inject: {
    public: {
        type: String
    }
  },
  data() {
    return {
      
    };
  },

  mounted() {
    console.log("儿子能否获得父亲传递的数组-attrs:",this.$attrs)
    console.log("儿子能否获得父亲传递的数组-listeners:",this.$listeners)
    console.log("祖先组件定义的provide-public-儿子组件:",this.public);
  },

  methods: {
    
  },
};
</script>