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
      <Text1 text={'组合-1'} color={'#fff'} />
      <Element
        id={'combine-sub-text-2'}
        color={'red'}
        is={Text1}
        text={'组合-2'}
        custom={{ displayName: '组合-文字-2' }}
      />
    </Container>
  );
}

Combine.craft = {
  ...Container.craft,
  displayName: '组合',
};
