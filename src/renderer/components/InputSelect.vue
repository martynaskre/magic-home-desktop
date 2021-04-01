<template>
  <div class="input-select">
    <div class="input-select-option input-select-placeholder" v-on:click="toggleListState">
      <template v-if="selectedItem != null">
        {{ options[selectedItem].value }}
      </template>
      <template v-else>
        {{ placeholder }}
      </template>
    </div>
    <div v-if="!listHidden" class="input-select-options">
      <div class="input-select-option" v-for="(option, index) in options" v-bind:key="option.key" v-on:click="selectItem(index)">
        {{ option.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

export interface Option {
  key: string | number;
  value: string;
}

@Component
export default class InputSelect extends Vue {
  @Prop({ type: String, default: 'Select' }) readonly placeholder!: string;
  @Prop({ type: Array, default: [] }) readonly options!: Array<Option>;
  @Prop({ type: String, default: null }) readonly selectedOption!: string|null;

  listHidden = true;
  selectedItem: number|null = null;

  created() {
    if (this.selectedOption) {
      this.selectedItem = this.options.findIndex((value) => value.key === this.selectedOption);
    }
  }

  toggleListState() {
    this.listHidden = !this.listHidden;
  }

  selectItem(index: number) {
    this.listHidden = true;
    this.selectedItem = index;

    this.$emit('input', this.options[index].key);
  }
}
</script>

<style lang="scss" scoped>
  $cellHeight: 28px;

  .input-select {
    position: relative;

    .input-select-options {
      position: absolute;
      top: 100%;
      bottom: 0;
      width: 100%;
      animation: fadeInTop .3s ease-in both;

      .input-select-option {
        border-top: 1px solid var(--primary-color);
      }
    }

    .input-select-option {
      height: $cellHeight;
      width: 100%;
      background-color: var(--secondary-color);
      color: var(--text-color);
      line-height: $cellHeight;
      font-size: 0.8em;
      padding: 0 10px;
      font-weight: 600;
      cursor: pointer;

      &.input-select-placeholder {
        padding-right: 40px;

        &:after {
          content: '\F0140';
          font-family: 'Material Design Icons';
          font-size: 1.5em;
          position: absolute;
          right: 10px;
          color: var(--heading-color);
        }
      }
    }
  }

  @keyframes fadeInTop {
    from {
      opacity: 0;
      transform: translate3d(0, -20%, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
</style>
