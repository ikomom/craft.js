import { useNode } from '@craftjs/core';
import React from 'react';

import { ToolbarItem, ToolbarSection } from '../../editor';
import { ToolbarRadio } from '../../editor/Toolbar/ToolbarRadio';

export function Text1Setting() {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
  }));

  return (
    <div>
      <div>
        字体大小
        <input
          type="number"
          value={fontSize}
          style={{
            outline: '2px solid purple',
          }}
          placeholder="Font size"
          onChange={(e) =>
            setProp((prop) => (prop.fontSize = Number(e.target.value) || ''))
          }
        />
      </div>
      <ToolbarSection
        title={'布局'}
        props={['left', 'top']}
        summary={({ left, top }) => `${left} ${top}`}
      >
        {/*<ToolbarItem propKey="position" type="radio" label="position">*/}
        {/*  <ToolbarRadio value="initial" label="initial" />*/}
        {/*  <ToolbarRadio value="absolute" label="absolute" />*/}
        {/*</ToolbarItem>*/}
        {/*<br />*/}
        <ToolbarItem propKey="left" type="text" label="left" />
        <ToolbarItem propKey="top" type="text" label="top" />
      </ToolbarSection>
    </div>
  );
}
