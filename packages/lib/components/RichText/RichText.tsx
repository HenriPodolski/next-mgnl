import React from 'react';
import cx from 'classnames';

import styles from './RichText.module.scss';

export type RichTextProps = {
    content: string;
    className?: string;
};

export default function RichText({ content, className }: RichTextProps) {
    return (
        <div
            className={cx(className, styles.RichText)}
            dangerouslySetInnerHTML={{ __html: content }}
        ></div>
    );
}