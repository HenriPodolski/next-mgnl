import React from 'react';
import LibRichText from '@next-mgnl/lib/components/Content/RichText/RichText';

type Props = {
  richtext: string;
};

const ContentRichText: React.FunctionComponent<Props> = (props: Props) => {
  const { richtext } = props;
  return <LibRichText content={richtext}></LibRichText>;
};

export default ContentRichText;
