import { useNode } from '@craftjs/core';
import React from 'react';

export function Text1Setting() {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
  }));

  return (
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
  );
}
