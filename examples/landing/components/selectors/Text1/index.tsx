import { useEditor, useNode } from '@craftjs/core';
import React from 'react';
import ContentEditable from 'react-contenteditable';

import { Text1Setting } from './Text1Setting';

const Text1 = ({ text = '默认', fontSize = 16, left = 0, top = 0 }) => {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode(() => {
    //node
    // console.log('Text1', node.id, node.events);
    return {};
  });
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  // console.log('collected', collected);
  return (
    <ContentEditable
      tagName="h2"
      innerRef={connect}
      disabled={!enabled}
      style={{ fontSize, left, top, width: '100%' }}
      html={text}
      onChange={(event) => {
        setProp((props) => (props.text = event.target.value), 1000);
      }}
    />
  );
};

Text1.craft = {
  displayName: 'Text1',
  props: {
    left: 0,
    top: 0,
  },
  // rules: {
  //   canDrop: (e) => {
  //     console.log('onDrag', e);
  //     return true;
  //   },
  //   canDrag: () => true,
  //   canMoveIn: () => true,
  //   canMoveOut: () => true,
  // },
  related: {
    toolbar: Text1Setting,
  },
};
export default Text1;
