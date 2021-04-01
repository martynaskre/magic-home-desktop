<template>
  <input
    type="range"
    class="input-range"
    :min="min"
    :max="max"
    :step="step"
    v-model="value"
    v-on:change="emitValue"
  >
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

@Component
export default class InputRange extends Vue {
  @Prop({ type: Number, default: 1 }) readonly min!: number;
  @Prop({ type: Number, default: 100 }) readonly max!: number;
  @Prop({ type: Number, default: 1 }) readonly step!: number;
  @Prop({ type: Number, default: 1 }) readonly defaultValue!: number;

  element: HTMLInputElement | null = null;

  isChanging = false;

  value: number = this.defaultValue;

  mounted() {
    this.element = document.querySelector('.input-range');

    if (this.element) {
      this.element.addEventListener('mousemove', this.handleMove);
      this.element.addEventListener('mousedown', this.handleDown);
      this.element.addEventListener('mouseup', this.handleUpAndLeave);
      this.element.addEventListener('mouseleave', this.handleUpAndLeave);
      this.element.addEventListener('click', this.setCssProperty);

      this.setCssProperty();
    }
  }

  setCssProperty() {
    if (this.element) {
      const percent: number = ((Number(this.element.value) - Number(this.element.min))
        / (Number(this.element.max) - Number(this.element.min)))
        * 100;

      this.element.style.setProperty('--webkitProgressPercent', `${percent}%`);
    }
  }

  handleMove() {
    if (!this.isChanging) return;

    this.setCssProperty();
  }

  handleUpAndLeave() {
    this.isChanging = false;
  }

  handleDown() {
    this.isChanging = true;
  }

  emitValue() {
    this.$emit('input', Number(this.value));
  }
}
</script>

<style lang="scss" scoped>
  .input-range {
    appearance: none;
    width: 100%;
    border-radius: 11px;
    --webkitProgressPercent: 0%;

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 6px;
      cursor: pointer;
      border-radius: 10px;
      background-image: linear-gradient(
        90deg,
        var(--accent-color) var(--webkitProgressPercent),
        var(--text-color) var(--webkitProgressPercent)
      );
    }

    &::-webkit-slider-thumb {
      box-shadow: 0 0 6px rgba(0, 0, 0, .8);
      border-radius: 100px;
      background-color: var(--accent-color);
      width: 10px;
      height: 10px;
      cursor: pointer;
      appearance: none;
      margin-top: -2px;
    }

    &:focus {
      outline: 0;
    }
  }
</style>
