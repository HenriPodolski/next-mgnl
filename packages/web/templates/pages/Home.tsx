import React from 'react';
import PropTypes from 'prop-types';
import { EditableArea } from '@magnolia/react-editor';
import Page, { PageProps } from './Page';

interface Props extends PageProps {
  main: any;
}

const Home: React.FunctionComponent<Props> = (props) => {
  const { main, ...rest } = props;

  return <Page {...rest}>{main && <EditableArea content={main} />}</Page>;
};

Home.propTypes = {
  main: PropTypes.any.isRequired,
};

export default Home;
