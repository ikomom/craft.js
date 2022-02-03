import { Element, useNode } from '@craftjs/core';
import React from 'react';

import { Container } from '../Container';
import Text1 from '../Text1';

export function Combine() {
  const {
    // connectors: { connect },
    // actions: { setProp },
  } = useNode();
  // TODO 组合无法拖拽
  return (
    <Container
      background={{
        r: 173,
        g: 216,
        b: 230,
        a: 1,
      }}
      height="auto"
      width="100%"
      padding={['10', '10', '10', '10']}
    >
      <Text1 text={'组合-1'} />
      <Element
        is={'div'}
        id={'combine-sub-text-2'}
        canvas
        style={{ width: ' 100%' }}
      >
        <Text1 text={'组合-2'} />
      </Element>
    </Container>
  );
}

Combine.craft = {
  ...Container.craft,
  rules: {
    canDrop: (e) => {
      console.log('onDrag', e);
      return true;
    },
    canDrag: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
  displayName: '组合',
};
