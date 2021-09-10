import PropTypes from 'prop-types';
import React from 'react';

export interface PageProps {
    children?: any;
}

const Page: React.FunctionComponent<PageProps> = (props) => {
    const { children } = props;

    return (
        <main>
            {children}
        </main>
    )
}

Page.propTypes = {
    children: PropTypes.any
};

export default Page;