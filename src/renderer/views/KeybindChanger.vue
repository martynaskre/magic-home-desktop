<template>
  <Container>
    <Header />
    <PageTitle :title="$t('keybindChanger.title', { device: device.name })" />
    <Content>
      <Block :inline="true">
        <Button :fullWidth="true" :spacerRight="true" :disabled="isSelecting" v-on:click="toggleRecordingState">
          {{ recordText }}
        </Button>
        <Button :fullWidth="true" :disabled="isRecording || keybindList.length == 0" v-on:click="toggleSelectingState">
          {{ selectText }}
        </Button>
      </Block>
      <Block height="310px">
        <Block v-show="isRecording" :spacerTop="true" :fadeIn="true">
          <Input :placeholder="$t('keybindChanger.record.inputPlaceholder')" :fullWidth="true" :defaultValue="keybindName" v-model="keybindName" />
          <Block :spacerTop="true" :inline="true">
            <Block :inline="true" width="auto" v-for="(key, index) in keybind" v-bind:key="index">
              <Button type="secondary" :decorative="true">
                {{ key }}
              </Button>
              <Button v-if="keybind.length - 1 != index" :boxy="true" color="transparent" :decorative="true">
                <Icon icon="plus" :hoverAnimation="false" />
              </Button>
            </Block>
          </Block>
        </Block>
        <Block v-if="isSelecting" :spacerTop="true" :fadeIn="true">
          <InputSelect :options="keybindList" v-model="selectedKeybind" />
        </Block>
      </Block>
      <Block v-if="currentKeybind">
        <Paragraph type="smaller" v-html="$t('keybindChanger.current')" />
        <Block :inline="true">
          <Block :inline="true" width="auto" v-for="(key, index) in currentKeybind.keys" v-bind:key="index">
              <Button type="secondary" :decorative="true">
                {{ key }}
              </Button>
              <Button v-if="currentKeybind.keys.length - 1 != index" :boxy="true" color="transparent" :decorative="true">
                <Icon icon="plus" :hoverAnimation="false" />
              </Button>
            </Block>
        </Block>
      </Block>
    </Content>
  </Container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { DevicesModule } from 'renderer/store/modules/Devices';
import { KeybindsModule } from 'renderer/store/modules/Keybinds';

import { Device } from 'shared/types/Device';

import Container from 'renderer/components/Container.vue';
import Header from 'renderer/components/Header.vue';
import PageTitle from 'renderer/components/PageTitle.vue';
import Button from 'renderer/components/Button.vue';
import Content from 'renderer/components/Content.vue';
import Block from 'renderer/components/Block.vue';
import Icon from 'renderer/components/Icon.vue';
import Paragraph from 'renderer/components/Paragraph.vue';
import Input from 'renderer/components/Input.vue';
import InputSelect from 'renderer/components/InputSelect.vue';

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
    Input,
    InputSelect,
  },
})
export default class KeybindChanger extends Vue {
  device: Device | null = null;
  isRecording = false;
  isSelecting = false;
  keybindName: string | null = null;
  keybind: string[] = [];
  selectedKeybind = null;

  get recordText() {
    if (this.isRecording) {
      if (this.keybind.length > 0 && this.keybindName) {
        return this.$t('keybindChanger.record.save');
      } else if (this.keybind.length > 0) {
        return this.$t('keybindChanger.record.stop');
      }

      return this.$t('keybindChanger.record.cancel');
    }

    return this.$t('keybindChanger.record.default');
  }

  get selectText() {
    if (this.selectedKeybind !== null && this.isSelecting) {
      return this.$t('keybindChanger.select.save');
    } else if (this.isSelecting) {
      return this.$t('keybindChanger.select.create');
    }

    return this.$t('keybindChanger.select.default');
  }

  get keybindList() {
    return KeybindsModule.list.filter((keybind) => {
      return !keybind.devices.includes((this.device) ? this.device.address : '');
    }).map((keybind) => {
      return {
        key: keybind.name,
        value: keybind.name,
      };
    });
  }

  get currentKeybind() {
    return KeybindsModule.list.find((keybind) => keybind.devices.includes((this.device) ? this.device.address : ''));
  }

  created() {
    KeybindsModule.getKeybinds();

    const { address } = this.$route.params;

    const deviceIndex = DevicesModule.list.findIndex(device => device.address == address);

    if (deviceIndex === -1) {
      this.$router.push({ name: 'devices' });

      return;
    }

    this.device = DevicesModule.list[deviceIndex];
  }

  toggleRecordingState() {
    if (this.device) {
      if (this.isRecording && this.keybind.length > 0 && !this.keybindName) {
        document.removeEventListener('keydown', this.recordKeys);

        return;
      }

      if (!this.isRecording) {
        document.addEventListener('keydown', this.recordKeys);
      } else {
        document.removeEventListener('keydown', this.recordKeys);
      }

      if (this.keybind.length > 0 && this.keybindName) {
        KeybindsModule.addKeybind({
          name: this.keybindName,
          keys: this.keybind,
          address: this.device.address,
        });
      }

      this.keybind = [];
      this.keybindName = null;

      this.isRecording = !this.isRecording;
    }
  }

  recordKeys(event: KeyboardEvent) {
    event.preventDefault();

		const key = event.key;

		this.keybind.push(key);
  }

  toggleSelectingState() {
    if (this.keybindList.length > 0 && this.device) {
      if (this.isSelecting && this.selectedKeybind !== null) {
        KeybindsModule.selectKeybind({
          name: this.selectedKeybind,
          address: this.device.address,
        });
      }

      this.isSelecting = !this.isSelecting;

      this.selectedKeybind = null;
    }
  }
}
</script>
