<template>
  <div
    class="content"
    v-bind:class="{ 'content-scrollable': scrollable }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

@Component
export default class Content extends Vue {
  @Prop({ type: Boolean, default: false }) readonly scrollable!: boolean;
}
</script>

<style lang="scss" scoped>
  .content {
    height: 433px;
    overflow-y: hidden;
    padding: 20px;

    &.content-scrollable {
      overflow-y: auto;
      padding-top: 0;
      padding-bottom: 0;
    }
  }
</style>
