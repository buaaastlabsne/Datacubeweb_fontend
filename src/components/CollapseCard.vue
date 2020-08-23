<template>
  <div class="collapse-card" :class="{'expanded': expanded}">
    <div class="collapse-card-header" role="button" tabindex="0" @click="handleHeaderClick">
      <i class="collapse-card-arrow el-icon-arrow-right"></i>
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="collapse-card-body" v-show="expanded">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'expand'],
  data () {
    return {
      expanded: typeof this.expand === 'boolean' ? this.expand : true
    }
  },
  watch: {
    expand: function () {
      this.expanded = typeof this.expand === 'boolean' ? this.expand : true
    }
  },
  methods: {
    handleHeaderClick () {
      this.expanded = !this.expanded
      this.$emit('expandChange')
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-top: 6px;
}
.collapse-card {
  background: #FFFFFF;
  border: 1px solid #DFE2EE;
  border-radius: 5px;
  padding: 10px 15px;
  /* overflow: hidden; */
}
.collapse-card + .collapse-card {
  margin-top: 15px;
}
.collapse-card-header {
  color: #333B49;
  cursor: pointer;
  font-size: 16px;
  outline: 0;
}
.collapse-card-arrow {
  float: right;
  margin-right: 2px;
  line-height: 22px;
  font-weight: 300;
  transition: transform .3s;
}
.collapse-card.expanded .collapse-card-arrow {
  transform: rotate(90deg);
}
.collapse-card-body {
  margin-top: 10px;
  color: #333B49;
}
</style>
