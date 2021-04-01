<template>
  <Container>
    <Header />
    <PageTitle :title="$t('settings.title')" />
    <Content :scrollable="true">
      <List>
        <ListItem>
          <Block width="80%">
            <Paragraph type="heading" v-html="$t('settings.theme.heading')" />
            <Paragraph type="small" v-html="$t('settings.theme.description')" />
          </Block>

          <template v-slot:right>
            <InputToggle :defaultValue="!darkMode" @input="(value) => changeSetting('darkMode', value)" />
          </template>
        </ListItem>
        <ListItem>
          <Block width="80%">
            <Paragraph type="heading" v-html="$t('settings.startup.heading')" />
            <Paragraph type="small" v-html="$t('settings.startup.description')" />
          </Block>

          <template v-slot:right>
            <InputToggle :defaultValue="openOnStartup" @input="(value) => changeSetting('openOnStartup', value)" />
          </template>
        </ListItem>
        <ListItem>
          <Block width="60%">
            <Paragraph type="heading" v-html="'Display language'" />
          </Block>

          <template v-slot:right>
            <InputSelect :options="languages" :selectedOption="$i18n.locale" @input="(value) => changeLanguage(value)" />
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
import InputSelect from 'renderer/components/InputSelect.vue';

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
    InputSelect,
  },
})
export default class Settings extends Vue {
  get darkMode() {
    return AppModule.darkMode;
  }

  get openOnStartup() {
    return AppModule.openOnStartup;
  }

  get languages() {
    return this.$i18n.availableLocales.map((language) => {
      return {
        key: language,
        value: this.$i18n.messages[language].languageName,
      };
    });
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

  changeLanguage(locale: string) {
    this.$i18n.locale = locale;

    AppModule.changeSetting({
      name: 'language',
      value: locale
    });
  }
}
</script>
