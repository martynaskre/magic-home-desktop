<template>
  <div class="checkbox-container">
    <input type="checkbox" class="checkbox" v-model="value">
    <div class="checkbox-visual"></div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch,
} from 'vue-property-decorator';

@Component
export default class InputToggle extends Vue {
  @Prop({ type: Boolean, default: false }) readonly defaultValue!: boolean;

  value: boolean = this.defaultValue;

  @Watch('value')
  onValueChanged(value: boolean) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss" scoped>
  $width: 59px;
  $iconPaddingLeft: 4px;

  .checkbox-container {
    height: 28px;
    width: $width;
    position: relative;

    .checkbox {
      width: 100%;
      height: 100%;
      appearance: none;
      margin: 0;
      padding: 0;
      z-index: 1;

      &:checked {
        & ~ .checkbox-visual {
          background-color: var(--accent-color);

          &:before {
            content: '\F05E0';
            margin-left: calc(#{$width} - 24px - #{$iconPaddingLeft});
            color: var(--accent-text-color);
            padding-left: 0;
          }
        }
      }

      &:focus {
        outline: 0;
      }
    }

    .checkbox-visual {
      background-color: var(--toggle-background-color);
      border-radius: 100px;
      width: 100%;
      height: 100%;
      transition: 0.3s cubic-bezier(0.83, 0, 0.17, 1);
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;

      &:before {
        content: '\F0159';
        font-family: 'Material Design Icons';
        color: var(--toggle-icon-color);
        font-size: 1.5em;
        border-radius: 50%;
        transition: 0.3s ease;
        padding-left: $iconPaddingLeft;
      }
    }
  }
</style>
