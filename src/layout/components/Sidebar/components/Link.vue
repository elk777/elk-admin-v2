<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot/>
  </component>
</template>

<script>
export default {
  name: 'Link',
  props: {
    to: {
      type: String,
      required: true
    },
  },
  computed: {
    type() {
        return this.to.startsWith('http') ? 'a' : 'router-link';
    },
  },

  methods: {
    linkProps(to) {
        if(this.type === 'a') {
            return {
                href: this.to,
                target: '_blank',
                rel: 'noopener noreferrer',
            };
        }
        return {
            to: to,
        };
    }
  },
};
</script>