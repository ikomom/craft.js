import { useNode } from '@craftjs/core';
import { Modal } from '@material-ui/core';
import React, { useState } from 'react';

export type TextTestProps = {
  text: string;
};
const style: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
};

export const TextTest = ({ text }: Partial<TextTestProps>) => {
  const {
    connectors: { connect, drag },
    isClicked,
    actions: { setProp },
  } = useNode((state) => ({
    isClicked: state.events.selected,
  }));
  const [open, setOpen] = useState(false);
  console.log('TextTest', text, isClicked);
  return (
    <div ref={(dom) => connect(drag(dom))}>
      <h2 onClick={() => setOpen(true)}>{text}</h2>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={style}>
          <input
            autoFocus={true}
            type="text"
            value={text}
            onChange={(e) => setProp((prop) => (prop.text = e.target.value))}
          />
        </div>
      </Modal>
    </div>
  );
};

TextTest.craft = {
  displayName: 'TextTest',
  props: {
    text: '',
  },
};
