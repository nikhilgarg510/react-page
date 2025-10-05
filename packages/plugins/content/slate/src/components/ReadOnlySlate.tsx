import React from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import type { SlateProps } from '../types/component';
import { useRenderElement, useRenderLeave } from './renderHooks';

const ReadOnlySlate = (props: SlateProps) => {
  const { plugins, defaultPluginType } = props;

  const renderElement = useRenderElement(
    {
      plugins,
      defaultPluginType,
    },
    []
  );
  const renderLeaf = useRenderLeave({ plugins, readOnly: true }, []);
  
  const editor = React.useMemo(() => withReact(createEditor()), []);
  
  // the div around is required to be consistent in styling with the default editor
  return (
    <div
      style={{
        position: 'relative',
        outline: 'none',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
      }}
    >
      <Slate
        editor={editor}
        value={props.data.slate}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          readOnly={true}
        />
      </Slate>
    </div>
  );
};

export default React.memo(ReadOnlySlate);
