import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { EditableArea } from '@magnolia/react-editor';
import Page, { PageProps } from './Page';
import AppContext from '../../utils/hooks/context';

interface Props extends PageProps {
  main: any;
}

const Home: React.FunctionComponent<Props> = (props) => {
  const { main, ...rest } = props;
  const appData = useContext(AppContext);

  return (
    <Page {...rest}>
      {appData[0].preview && main && <EditableArea content={main} />}
    </Page>
  );
};

Home.propTypes = {
  main: PropTypes.any.isRequired,
};

export default Home;
