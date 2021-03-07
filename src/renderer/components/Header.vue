<template>
  <div class="header">
    <div
      v-if="$route.name != 'devices'"
      v-on:click="$router.push({ name: 'devices' })"
      class="header-left"
    >
      <Icon icon="arrow-left"></Icon>
    </div>
    <Heading :type="2">Magic Control</Heading>
    <div
      v-if="$route.name == 'devices'"
      v-on:click="$router.push({ name: 'settings' })"
      class="header-right"
    >
      <Icon icon="cog"></Icon>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
} from 'vue-property-decorator';

import Heading from 'renderer/components/Heading.vue';
import Icon from 'renderer/components/Icon.vue';

@Component({
  components: {
    Heading,
    Icon,
  },
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
  .header {
    background-color: var(--secondary-color);
    height: 61px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

    .header-left {
      margin-right: 10px;
      cursor: pointer;
    }

    .header-right {
      margin-left: auto;
      cursor: pointer;
    }
  }
</style>
