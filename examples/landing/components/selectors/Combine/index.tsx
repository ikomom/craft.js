import { Element, useNode } from '@craftjs/core';
import React from 'react';

import { Container } from '../Container';
import Text1 from '../Text1';

export function Combine() {
  const {
    // connectors: { connect },
    // actions: { setProp },
  } = useNode();
  return (
    <Element
      id={'combine-text'}
      is={Container}
      background={{
        r: 173,
        g: 216,
        b: 230,
        a: 1,
      }}
      padding={['10', '10', '10', '10']}
      canvas
    >
      <Text1 text={'组合-1'} color={'#fff'} />
      <Element
        id={'combine-sub-text-2'}
        color={'red'}
        is={Text1}
        text={'组合-2'}
        custom={{ displayName: '组合-文字-2' }}
      />
    </Element>
  );
}

Combine.draft = {
  props: {},
};
