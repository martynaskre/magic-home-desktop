<template>
  <div class="block"
    v-bind:class="classes"
    v-bind:style="{ width: (width) ? width : '100%', height: (height) ? height : 'auto' }"
  >
    <div v-if="!inline && (verticalCenter || horizontalCenter)" class="block-inner">
      <slot></slot>
    </div>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

@Component
export default class Block extends Vue {
  @Prop({ type: String, default: '' }) readonly width!: string;
  @Prop({ type: String, default: '' }) readonly height!: string;
  @Prop({ type: Boolean, default: false }) readonly inline!: boolean;
  @Prop({ type: Boolean, default: false }) readonly verticalCenter!: boolean;
  @Prop({ type: Boolean, default: false }) readonly horizontalCenter!: boolean;
  @Prop({ type: Boolean, default: false }) readonly fadeIn!: boolean;
  @Prop({ type: Boolean, default: false }) readonly spacerTop!: boolean;
  @Prop({ type: Boolean, default: false }) readonly spacerBottom!: boolean;
  @Prop({ type: Number, default: 1 }) readonly type!: number;

  get classes() {
    const classes = [];

    if (this.inline) {
      classes.push('block-inline');
    }

    if (this.verticalCenter) {
      classes.push('block-vertical-center');
    }

    if (this.horizontalCenter) {
      classes.push('block-horizontal-center');
    }

    if (this.fadeIn) {
      classes.push('block-fade-in');
    }

    if (this.spacerTop) {
      classes.push('block-spacer-top');
    }

    if (this.spacerBottom) {
      classes.push('block-spacer-bottom');
    }

    return classes;
  }
}
</script>

<style lang="scss" scoped>
  .block {
    display: block;

    &.block-fade-in {
      animation: fade-in 2s;
    }

    &.block-spacer-top {
      padding-top: 10px;
    }

    &.block-spacer-bottom {
      padding-bottom: 10px;
    }

    &:not(.block-inline) {
      &.block-vertical-center {
        .block-inner {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      &.block-horizontal-center {
        .block-inner {
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    &.block-inline {
      display: flex;

      &.block-vertical-center {
        align-items: center;
      }

      &.block-horizontal-center {
        justify-content: center;
      }
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
</style>
