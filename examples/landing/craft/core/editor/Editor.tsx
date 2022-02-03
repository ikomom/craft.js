import React from 'react';

import { EditorContext } from './EditorContext';

type Options = {
  enabled: boolean; // 编辑器启用
};

export const Eidtor: React.FC<Options> = ({ enabled, children }) => {
  return (
    <EditorContext.Provider value={{ enabled }}>
      {children}
    </EditorContext.Provider>
  );
};
