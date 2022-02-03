import { Button } from '@material-ui/core';
import React from 'react';

import useMethods from '../../craft/utils/useMethods';

export default function TestUseMethods() {
  const [{ count }, { reset, increment, decrement }] = useMethods(
    methods,
    initialState
  );
  return (
    <div>
      Count: {count}
      <Button variant={'outlined'} onClick={reset}>
        Reset
      </Button>
      <Button variant={'outlined'} onClick={increment}>
        +
      </Button>
      <Button variant={'outlined'} onClick={decrement}>
        -
      </Button>
    </div>
  );
}

const initialState = { count: 0 };

const methods = (state) => ({
  reset() {
    return initialState;
  },
  increment() {
    state.count++;
  },
  decrement() {
    state.count--;
  },
});
