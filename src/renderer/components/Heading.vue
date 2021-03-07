<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

import {
  VNode,
  CreateElement,
} from 'vue';

@Component
export default class Content extends Vue {
  @Prop({ type: Number, default: 1 }) readonly type!: number;

  render(createElement: CreateElement): VNode {
    const heading = `h${this.type}`;

    return createElement(heading, this.$slots.default);
  }
}
</script>

<style lang="scss" scoped>
  h1, h2, h3, h4, h5 {
    font-family: 'Avenir Next';
    font-weight: 700;
    color: var(--heading-color);
    margin: 0;
  }
</style>
