<template>
  <div class="page-title">
    <Paragraph>{{ title }}</Paragraph>
    <div class="page-title-right">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

import Paragraph from 'renderer/components/Paragraph.vue';

@Component({
  components: {
    Paragraph,
  },
})
export default class PageTitle extends Vue {
  @Prop(String) readonly title!: string;
}
</script>

<style lang="scss" scoped>
  .page-title {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 69px;
    border-bottom: 1px solid var(--secondary-color);

    .page-title-right {
      margin-left: auto;
    }
  }
</style>
