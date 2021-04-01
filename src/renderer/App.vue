<template>
  <div class="top-container" v-bind:class="containerClass">
    <div class="arrow-top"></div>
    <main>
      <transition :name="transition">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { AppModule } from 'renderer/store/modules/App';
import { changeTheme } from 'renderer/utils';

@Component
export default class App extends Vue {
  transition = '';
  containerClass = (window.api.platform === 'win32') ? 'window-windows' : 'window-mac';

  get darkMode() {
    return AppModule.darkMode;
  }

  get language() {
    return AppModule.language;
  }

  async created() {
    await AppModule.getSettings();

    changeTheme(!this.darkMode);

    this.$i18n.locale = this.language;
  }

  @Watch('$route')
  onRouteChanged(to: Route) {
    this.transition = (to.name === 'devices') ? 'prev' : 'next';
  }
}
</script>

<style lang="scss">
  $mdi-font-path: '~@mdi/font/fonts';

  @import '~@mdi/font/scss/materialdesignicons';

  @font-face {
    font-family: 'Avenir Next';
    font-weight: bold;
    src: url('assets/fonts/Avenir Next Bold.otf') format('opentype');
  }

  @font-face {
    font-family: 'Axiforma';
    src: url('assets/fonts/Axiforma Regular.otf') format('opentype');
  }

  @font-face {
    font-family: 'Axiforma';
    font-weight: 600;
    src: url('assets/fonts/Axiforma SemiBold.otf') format('opentype');
  }

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    transition: 0.3s;
    overflow: hidden;
    font-family: 'Axiforma';
    user-select: none;
    background-color: transparent;

    --accent-color: #0076fe;
    --accent-text-color: #fff;
    --primary-color: #1E1F24;
    --secondary-color: #25252D;
    --heading-color: #fff;
    --text-color: #8e8e90;
    --icon-color: #fff;
    --button-text-color: #fff;
    --toggle-background-color: var(--secondary-color);
    --toggle-icon-color: var(--text-color);

    &.light-theme {
      --primary-color: #F9F9F9;
      --secondary-color: #fff;
      --heading-color: #2E395F;
      --text-color: #CED1DA;
      --icon-color: #2E395F;
      --button-text-color: #2E395F;
      --toggle-background-color: #CED1DA;
      --toggle-icon-color: #8E8E90;
    }
  }

  *, ::after, ::before {
    box-sizing: border-box;
  }

  .top-container {
    position: relative;
    height: 563px;
    width: 400px;

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1002;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      width: 0;
      height: 0;
      display: none;
    }

    &:before {
      top: 0;
      border-bottom: 5px solid var(--secondary-color);
    }

    &:after {
      bottom: -5px;
      border-top: 5px solid var(--primary-color);
    }

    &.window-mac {
      padding-top: 5px;

      &:before {
        display: block;
      }
    }

    &.window-windows {
      box-shadow: 0 0 10px rgba(0, 0, 0, .5);
      margin: 10px;

      &:after {
        display: block;
      }
    }
  }

  main {
    min-height: 563px;
    display: grid;
    grid-template: 'main';
    flex: 1;
    position: relative;
    z-index: 0;
    overflow-x: hidden;
    background-color: transparent;

    & > :first-child {
      z-index: 1001;
    }

    * {
      grid-area: main;
      position: relative;
    }
  }

  /* Transitions */

  .next-leave-to {
    animation: leaveToLeft 700ms both cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 1000;
  }

  .next-enter-to {
    animation: enterFromRight 700ms both cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 1001;
  }

  .prev-leave-to {
    animation: leaveToRight 700ms both cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 1001;
  }

  .prev-enter-to {
    animation: enterFromLeft 700ms both cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 1000;
  }

  @keyframes leaveToLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-25%);
      filter: brightness(0.1);
    }
  }

  @keyframes enterFromLeft {
    from {
      transform: translateX(-25%);
      filter: brightness(0.5);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes leaveToRight {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }

  @keyframes enterFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
</style>
