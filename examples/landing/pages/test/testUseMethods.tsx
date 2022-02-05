import { Button } from '@material-ui/core';
import { Patch } from 'immer';
import React from 'react';

import { useMethod1 } from '../../craft/utils/useMethod1';
// import useMethods from '../../craft/utils/useMethods';

export default function TestUseMethods() {
  const [{ count }, { reset, increment, decrement }] = useMethod1(
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

const initialState = { count: 0, test: 1 };
const patchList: Patch[] = [];
const inverseList: Patch[] = [];

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
