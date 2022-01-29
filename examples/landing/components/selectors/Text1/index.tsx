import { useNode } from '@craftjs/core';
import React from 'react';
import ContentEditable from 'react-contenteditable';

const Text1 = ({ text = '默认', fontSize = 16 }) => {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode(() => {
    //node
    // console.log('Text1', node.id, node.events);
    return {};
  });
  // suppressContentEditableWarning
  // contentEditable="true"
  return (
    <ContentEditable
      innerRef={connect}
      style={{ fontSize }}
      html={text}
      onChange={(event) => {
        console.log('onChange', event.target.value);
        setProp((props) => (props.text = event.target.value), 1000);
      }}
    />
  );
};

Text1.craft = {
  props: {},
  rules: {
    canDrop: () => true,
    canDrag: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
  related: {},
};
export default Text1;
