<template>
  <Container>
    <Header />
    <PageTitle :title="$t('devices.title')">
      <Button v-on:click="discoverDevices" :disabled="controllerBusy" v-html="$t('devices.discoverButton')" />
    </PageTitle>
    <Content :scrollable="true">
      <Block
        v-if="controllerBusy"
        :inline="true"
        :verticalCenter="true"
        :horizontalCenter="true"
        :fadeIn="true"
        height="100%"
      >
        <Icon icon="lightbulb" classes="color-pulse" />
        <Paragraph v-html="$t('devices.discoveringSlogan')" />
      </Block>
      <List v-else>
        <ListItem
          v-for="(device, index) in devices"
          v-bind:key="device.id"
        >
          <Button
            :boxy="true"
            :color="deviceColor[index]"
            v-on:click="toggleDeviceState(device.address)"
          >
            <Icon icon="power" color="#fff" />
          </Button>
          <Input
            :invisible="true"
            :large="true"
            :defaultValue="device.name"
            @input="(name) => changeDeviceName(device.address, name)"
          />

          <template v-slot:right>
            <Button
              type="secondary"
              :boxy="true"
              :spacerRight="true"
              v-on:click="$router.push({ name: 'color-changer', params: { address: device.address } })"
            >
              <Icon icon="palette" />
            </Button>
            <Button
              type="secondary"
              :boxy="true"
              :spacerRight="true"
              v-on:click="$router.push({ name: 'keybind-changer', params: { address: device.address } })"
            >
              <Icon icon="keyboard" />
            </Button>
            <Button
              type="secondary"
              :boxy="true"
              v-on:click="() => removeDevice(device.address)"
            >
              <Icon icon="delete" />
            </Button>
          </template>
        </ListItem>
      </List>
    </Content>
  </Container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { DevicesModule } from 'renderer/store/modules/Devices';
import { AppModule } from 'renderer/store/modules/App';

import Container from 'renderer/components/Container.vue';
import Header from 'renderer/components/Header.vue';
import PageTitle from 'renderer/components/PageTitle.vue';
import Button from 'renderer/components/Button.vue';
import Content from 'renderer/components/Content.vue';
import Block from 'renderer/components/Block.vue';
import List from 'renderer/components/List.vue';
import ListItem from 'renderer/components/ListItem.vue';
import Icon from 'renderer/components/Icon.vue';
import Input from 'renderer/components/Input.vue';
import Paragraph from 'renderer/components/Paragraph.vue';

@Component({
  components: {
    Container,
    Header,
    PageTitle,
    Button,
    Content,
    Block,
    List,
    ListItem,
    Icon,
    Input,
    Paragraph,
  },
})
export default class Devices extends Vue {
  get controllerBusy() {
    return AppModule.controllerBusy;
  }

  get devices() {
    return DevicesModule.list;
  }

  get deviceColor() {
    return this.devices.map((device) => {
      const { color } = device.data;

      return (!device.data.on) ? `rgba(${color.r}, ${color.g}, ${color.b}, .5)` : color.hex;
    });
  }

  mounted() {
    this.queryDeviceData();
  }

  async discoverDevices() {
    await DevicesModule.discoverDevices();
    await DevicesModule.getDevices();
  }

  async queryDeviceData() {
    await DevicesModule.getDevices();
  }

  changeDeviceName(address: string, name: string) {
    DevicesModule.changeDeviceName({
      address,
      name,
    });
  }

  async toggleDeviceState(address: string) {
    await DevicesModule.toggleDeviceState(address);
  }

  removeDevice(address: string) {
    DevicesModule.removeDevice(address);
  }
}
</script>

<style lang="scss">
  .color-pulse {
    animation: color-pulse 2s infinite alternate;
  }

  @keyframes color-pulse {
    0% {color: #4CA0E0;}
    25% {color: #FFB802;}
    50% {color: #D9442F;}
    75% {color: #3BC492;}
    100% {color: #e5e5e5;}
  }
</style>
