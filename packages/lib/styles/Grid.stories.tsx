import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Markup from '../components/Content/Markup/Markup';

export default {
  title: 'Layout / Grid',
  component: Markup,
  argTypes: {
    content: { control: 'text' },
  },
} as ComponentMeta<typeof Markup>;

const GridTemplate: ComponentStory<typeof Markup> = (args) => (
  <Markup {...args} className="ContentGrid" />
);

export const ContentGrid = GridTemplate.bind({});
ContentGrid.args = {
  content: `
      <div class="ContentGridItem" style="min-height:100px; background-color: lightblue; display: flex; justify-content: center; align-items: center;">centered (default)</div>
      <div class="ContentGridItem LeftAligned" style="min-height:100px; background-color: lightblue; display: flex; justify-content: center; align-items: center;">left aligned (.LeftAligned)</div>
      <div class="ContentGridItem RightAligned" style="min-height:100px; background-color: lightblue; display: flex; justify-content: center; align-items: center;">right aligned (.RightAligned)</div>
  `,
};
