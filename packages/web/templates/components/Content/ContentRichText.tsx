import React from 'react';
import { RichText } from 'lib';

type Props = {
  richtext: string;
};

const ContentRichText: React.FunctionComponent<Props> = (props: Props) => {
  const { richtext } = props;
  return <RichText content={richtext}></RichText>;
};

export default ContentRichText;
