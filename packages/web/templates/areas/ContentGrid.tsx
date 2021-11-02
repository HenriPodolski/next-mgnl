import React from 'react';
import { EditableArea, EditorContextHelper } from '@magnolia/react-editor';
import MagnoliaConfig from '../../magnolia.config';
import cx from 'classnames';

type Props = {
  contentComponents?: any;
  metadata: any;
};

interface ComponentDefinition {
  [key: string]: any;
}

const ContentGrid: React.FunctionComponent<Props> = (props: Props) => {
  const { contentComponents, metadata } = props;
  return (
    <>
      {contentComponents && (
        <div className="ContentGrid">
          {!EditorContextHelper.inEditor() &&
            contentComponents['@nodes'].map((itemKey: string) => {
              const data = contentComponents[itemKey];
              const mappings: ComponentDefinition =
                MagnoliaConfig.componentMappings;
              const Component =
                mappings[contentComponents[itemKey]['mgnl:template']];

              console.log('data', data);

              return (
                <div
                  key={`Content-${itemKey}`}
                  className={cx('ContentGridItem')}
                >
                  <Component {...data} />
                </div>
              );
            })}
          {EditorContextHelper.inEditor() && (
            <EditableArea
              content={contentComponents}
              parentTemplateId={metadata['mgnl:template']}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ContentGrid;
