import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RichText from './RichText';

export default {
    title: 'RichText',
    component: RichText,
    argTypes: {
        content: { control: 'text' },
    },
} as ComponentMeta<typeof RichText>;

const Template: ComponentStory<typeof RichText> = (args) => <RichText {...args} />;

export const RichTextPrimaryDemo = Template.bind({});
RichTextPrimaryDemo.args = {
    content: '<h3>RichText</h3><br><strong>bold</strong> <em>italic</em><br><a href="#">Link</a>',
};