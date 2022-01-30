import { useNode } from '@craftjs/core';
import React from 'react';
import ContentEditable from 'react-contenteditable';

import { Text1Setting } from './Text1Setting';

const Text1 = ({ text = '默认', fontSize = 16, color = '#000' }) => {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode(() => {
    //node
    // console.log('Text1', node.id, node.events);
    return {};
  });
  // console.log('collected', collected);
  return (
    <ContentEditable
      innerRef={connect}
      style={{ fontSize, color }}
      html={text}
      onChange={(event) => {
        setProp((props) => (props.text = event.target.value), 1000);
      }}
    />
  );
};

Text1.craft = {
  props: {},
  rules: {
    canDrop: (e) => {
      console.log('onDrag', e);
      return true;
    },
    canDrag: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
  related: {
    toolbar: Text1Setting,
  },
};
export default Text1;
