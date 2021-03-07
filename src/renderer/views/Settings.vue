<template>
  <Container>
    <Header />
    <PageTitle title="Settings" />
    <Content :scrollable="true">
      <List>
        <ListItem>
          <Block width="80%">
            <Paragraph type="heading">Enable light theme</Paragraph>
          </Block>

          <template v-slot:right>
            <InputToggle @input="changeValue" />
          </template>
        </ListItem>
        <ListItem>
          <Block width="80%">
            <Paragraph type="heading">Color preset syncing</Paragraph>
            <Paragraph type="small">
              Save yourself a few clicks and let the app change color across all devices.
            </Paragraph>
          </Block>

          <template v-slot:right>
            <InputToggle />
          </template>
        </ListItem>
      </List>
    </Content>
  </Container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

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
  changeValue(value: boolean) {
    if (value) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    }
  }
}
</script>
