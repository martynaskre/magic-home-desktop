<template>
  <div class="list-item" v-bind:class="{ 'list-item-last': lastItem }">
    <slot></slot>
    <div class="list-item-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

@Component
export default class ListItem extends Vue {
  @Prop({ type: Boolean, default: false }) readonly lastItem!: boolean;
}
</script>

<style lang="scss" scoped>
  .list-item {
    display: flex;
    padding: 16px 0;
    align-items: center;
    border-bottom: 1px solid var(--secondary-color);

    &.list-item-last {
      border-bottom: none;
    }

    .list-item-right {
      margin-left: auto;
      display: flex;
    }
  }
</style>
