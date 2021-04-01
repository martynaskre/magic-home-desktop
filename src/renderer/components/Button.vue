<template>
  <button
    type="button"
    class="button"
    v-bind:class="classes"
    v-bind:style="{ 'background-color': color }"
    v-on:click="$emit('click')"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: String, default: '' }) readonly type!: string;
  @Prop({ type: Boolean, default: false }) readonly spacerLeft!: boolean;
  @Prop({ type: Boolean, default: false }) readonly spacerRight!: boolean;
  @Prop({ type: Boolean, default: false }) readonly boxy!: boolean;
  @Prop({ type: String, default: '' }) readonly color!: string;
  @Prop({ type: Boolean, default: false }) readonly fullWidth!: boolean;
  @Prop({ type: Boolean, default: false }) readonly decorative!: boolean;

  get classes() {
    const classes = [];

    if (!this.type && !this.boxy) {
      classes.push('button-accent');
    } else {
      classes.push(`button-${this.type}`);
    }

    if (this.boxy) {
      classes.push('button-boxy');
    }

    if (this.spacerLeft) {
      classes.push('button-spacer-left');
    }

    if (this.spacerRight) {
      classes.push('button-spacer-right');
    }

    if (this.fullWidth) {
      classes.push('button-full-width');
    }

    if (this.decorative) {
      classes.push('button-decorative');
    }

    return classes;
  }
}
</script>

<style lang="scss" scoped>
  .button {
    border: none;
    border-radius: 0;
    font-weight: 600;
    font-family: 'Axiforma';
    padding: 2.5px 11px;
    cursor: pointer;
    transition: .3s;
    font-size: 0.9em;

    &.button-spacer-left {
      margin-left: 10px;
    }

    &.button-spacer-right {
      margin-right: 10px;
    }

    &.button-accent {
      background-color: var(--accent-color);
      color: var(--accent-text-color);
    }

    &.button-secondary {
      background-color: var(--secondary-color);
      color: var(--button-text-color);
    }

    &.button-full-width {
      width: 100%;
    }

    &:disabled {
      opacity: .5;
      cursor: not-allowed;

      &:hover {
        opacity: .5;
      }
    }

    &:hover {
      opacity: .8;
    }

    &:focus {
      outline: 0;
    }

    &.button-boxy {
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &.button-decorative {
      cursor: initial;

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
