<template>
  <Container>
    <Header />
    <PageTitle title="Settings" />
    <Content :scrollable="true">
      <List>
        <ListItem>
          <Block width="80%">
            <Paragraph type="heading">Enable light theme</Paragraph>
            <Paragraph type="small">
              Decrease your productivity by 100%.
            </Paragraph>
          </Block>

          <template v-slot:right>
            <InputToggle :defaultValue="!darkMode" @input="(value) => changeSetting('darkMode', value)" />
          </template>
        </ListItem>
        <ListItem>
          <Block width="80%">
            <Paragraph type="heading">Open on startup</Paragraph>
            <Paragraph type="small">
              Save yourself a few clicks and let the Magic happen.
            </Paragraph>
          </Block>

          <template v-slot:right>
            <InputToggle :defaultValue="openOnStartup" @input="(value) => changeSetting('openOnStartup', value)" />
          </template>
        </ListItem>
      </List>
    </Content>
  </Container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { AppModule } from 'renderer/store/modules/App';

import { changeTheme } from 'renderer/utils';

import Container from 'renderer/components/Container.vue';
import Header from 'renderer/components/Header.vue';
import PageTitle from 'renderer/components/PageTitle.vue';
import Content from 'renderer/components/Content.vue';
import List from 'renderer/components/List.vue';
import ListItem from 'renderer/components/ListItem.vue';
import Block from 'renderer/components/Block.vue';
import Paragraph from 'renderer/components/Paragraph.vue';
import InputToggle from 'renderer/components/InputToggle.vue';

@Component({
  components: {
    Container,
    Header,
    PageTitle,
    Content,
    List,
    ListItem,
    Block,
    Paragraph,
    InputToggle,
  },
})
export default class Settings extends Vue {
  get darkMode() {
    return AppModule.darkMode;
  }

  get openOnStartup() {
    return AppModule.openOnStartup;
  }

  mounted() {
    AppModule.getSettings();
  }

  changeSetting(name: string, value: boolean) {
    AppModule.changeSetting({
      name,
      value
    });

    if (name == 'darkMode') {
      changeTheme(value);
    }
  }
}
</script>
