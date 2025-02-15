import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HelloWorld from '../../src/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders the correct message', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Hello Vue!' },
    });

    expect(wrapper.text()).toContain('Hello Vue!');
  });
});
