<template>
  <Container>
    <Header />
    <PageTitle :title="`Changing color for ${device.name}`" />
    <Content>
      <Block :inline="true" :horizontalCenter="true" :fadeIn="true">
        <ColorPicker :initialColor="device.data.color.hex" v-model="color" />
      </Block>
      <Block :verticalCenter="true" height="151px">
        <Paragraph type="smaller">Brightness:</Paragraph>
        <InputRange :defaultValue="device.data.brightness" v-model="brightness" />
      </Block>
      <Block>
        <Paragraph type="smaller">Presets:</Paragraph>
        <Block :inline="true">
          <Button
            v-for="(preset, index) in $store.state.presets.list"
            v-bind:key="index"
            :boxy="true"
            :color="preset.color.hex"
            :spacerRight="true"
            v-on:click="presetAction(preset, index)"
          >
            <Icon v-if="deleting" icon="close" />
          </Button>
          <Button
            v-if="$store.state.presets.list.length < $config.maxPresets && !deleting"
            :boxy="true"
            color="transparent"
            v-on:click="addPreset"
          >
            <Icon :classes="shakeClass" icon="plus" />
          </Button>
          <Button
            v-else
            :boxy="true"
            color="transparent"
            v-on:click="toggleDelete"
          >
            <Icon icon="delete" />
          </Button>
        </Block>
      </Block>
    </Content>
  </Container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

import { DevicesModule } from 'renderer/store/modules/Devices';

import { Color } from 'shared/types/Color';
import { Preset } from 'shared/types/Preset';

import Container from 'renderer/components/Container.vue';
import Header from 'renderer/components/Header.vue';
import PageTitle from 'renderer/components/PageTitle.vue';
import Button from 'renderer/components/Button.vue';
import Content from 'renderer/components/Content.vue';
import Block from 'renderer/components/Block.vue';
import Icon from 'renderer/components/Icon.vue';
import Paragraph from 'renderer/components/Paragraph.vue';
import ColorPicker from 'renderer/components/ColorPicker.vue';
import InputRange from 'renderer/components/InputRange.vue';

@Component({
  components: {
    Container,
    Header,
    PageTitle,
    Button,
    Content,
    Block,
    Icon,
    Paragraph,
    ColorPicker,
    InputRange,
  },
})
export default class ColorChanger extends Vue {
  color!: Color;

  brightness!: number;

  deleting = false;

  shouldShake = false;

  get device() {
    const { id } = this.$route.params;

    return DevicesModule.findDeviceById(id);
  }

  get shakeClass() {
    return (this.shouldShake) ? 'shake' : '';
  }

  @Watch('color')
  onColorChanged(color: Color) {
    if (this.device) {
      const brightness = (this.brightness) ? this.brightness : this.device.data.brightness;

      this.changeColor(color, brightness);
    }
  }

  @Watch('brightness')
  onBrightnessChanged(brightness: number) {
    if (this.device) {
      const color = (this.color) ? this.color : this.device.data.color;

      this.changeColor(color, brightness);
    }
  }

  async changeColor(color: Color, brightness: number) {
    console.log({
      color,
      brightness,
    });
  }

  addPreset() {
    console.log('add preset');
  }

  async presetAction(preset: Preset, index: number) {
    if (this.deleting) {
      await this.removePreset(index);

      return;
    }

    await this.selectPreset(preset);
  }

  async selectPreset(preset: Preset) {
    await this.changeColor(preset.color, preset.brightness);
  }

  async removePreset(index: number) {
    await this.$store.dispatch('removePreset', index);
  }

  toggleDelete() {
    this.deleting = !this.deleting;
  }
}
</script>

<style lang="scss">
  .shake {
    animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
  }

  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>
