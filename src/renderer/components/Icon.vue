<template>
  <span class="mdi" v-bind:class="iconClasses" v-bind:style="{ color: color }"></span>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

@Component
export default class Content extends Vue {
  @Prop({ type: String, default: '' }) readonly icon!: string;
  @Prop({ type: String, default: '' }) readonly color!: string;
  @Prop({ type: String, default: '' }) readonly classes!: string;
  @Prop({ type: Boolean, default: false }) readonly hoverAnimation!: boolean;

  get iconClasses() {
    const classes = [];

    classes.push(`mdi-${this.icon}`);

    this.classes.split(' ').forEach((value) => {
      classes.push(value);
    });

    if (this.hoverAnimation) {
      classes.push('mdi-hover-animation');
    }

    return classes;
  }
}
</script>

<style lang="scss" scoped>
  .mdi {
    color: var(--icon-color);
    transition: .3s;
    font-size: 1.5em;
    position: relative;
    top: 2px;

    &.mdi-hover-animation {
      &:hover {
        opacity: .7;
      }
    }
  }
</style>
