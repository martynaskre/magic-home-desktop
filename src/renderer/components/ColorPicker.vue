<template>
  <div class="picker">
    <div id="color-picker"></div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch,
} from 'vue-property-decorator';

import iro from '@jaames/iro';

@Component
export default class ColorPicker extends Vue {
  @Prop({ type: Number, default: 187 }) readonly width!: number;
  @Prop({ type: String, default: '#fff' }) readonly initialColor!: string;

  colorWheel!: iro.ColorPicker;

  @Watch('initialColor')
  onInitialColorChanged(color: string) {
    if (this.colorWheel !== null) {
      this.colorWheel.setColors([color]);
    }
  }

  mounted() {
    this.createColorWheel();
  }

  createColorWheel() {
    this.colorWheel = iro.ColorPicker('#color-picker', {
      layout: [
        {
          component: iro.ui.Wheel,
        },
      ],
      width: this.width,
      color: this.initialColor,
    });

    this.colorWheel.on('input:end', (color: iro.Color) => {
      this.$emit('input', {
        r: color.rgb.r,
        g: color.rgb.g,
        b: color.rgb.b,
        hex: color.hexString,
      });
    });
  }
}
</script>
