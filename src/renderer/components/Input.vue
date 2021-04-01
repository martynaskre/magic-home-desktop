<template>
  <input
    :type="type"
    class="input"
    v-bind:class="{
      'input-invisible': invisible,
      'input-large': large,
      'input-full-width': fullWidth
    }"
    :spellcheck="checkSpelling"
    :placeholder="placeholder"
    v-model="inputContent"
  >
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch,
} from 'vue-property-decorator';

@Component
export default class Input extends Vue {
  @Prop({ type: String, default: 'text' }) readonly type!: string;
  @Prop(String) readonly placeholder!: string;
  @Prop(String) readonly defaultValue!: string;
  @Prop({ type: Boolean, default: false }) readonly invisible!: boolean;
  @Prop({ type: Boolean, default: false }) readonly checkSpelling!: boolean;
  @Prop({ type: Boolean, default: false }) readonly large!: boolean;
  @Prop({ type: Boolean, default: false }) readonly fullWidth!: boolean;

  inputContent: string = this.defaultValue;

  @Watch('defaultValue')
  onDefaultValueChanged(value: string) {
    this.inputContent = value;
  }

  @Watch('inputContent')
  onInputContentChanged(value: string) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss" scoped>
  .input {
    background-color: transparent;
    border: 1px solid var(--secondary-color);
    color: var(--text-color);
    font-size: 0.75em;
    padding: 4px 10px;
    font-family: 'Axiforma';
    font-weight: 600;

    &::placeholder {
      color: var(--text-color);
    }

    &.input-invisible {
      border-color: transparent;
      color: var(--heading-color);
    }

    &.input-large {
      font-size: 1em;
    }

    &.input-full-width {
      width: 100%;
    }

    &:focus {
      outline: 0;
    }
  }
</style>
