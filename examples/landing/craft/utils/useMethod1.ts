import produce, {
  PatchListener,
  produceWithPatches,
  enablePatches,
} from 'immer';
import { Reducer, useMemo, useReducer, useRef } from 'react';

import { History, HISTORY_ACTIONS } from './History';
import {
  ActionUnion,
  CallbacksFor,
  MethodRecordBase,
  Methods,
  MethodsOrOptions,
  StateAndCallbacksFor,
} from './useMethods';

enablePatches();

/**
 * useMethod 强行凑类型， 搞不懂
 * @param methodOrOptions
 * @param initialState
 * @param queryMethods
 */
export const useMethod1 = <S, R extends MethodRecordBase<S>>(
  methodOrOptions: MethodsOrOptions<S, R>,
  initialState: S,
  queryMethods?: any
): StateAndCallbacksFor<MethodsOrOptions<S, R>> => {
  // const normalizeHistoryRef = useRef<any>();
  const history = useMemo(() => new History(), []);
  console.log('queryMethods', queryMethods);
  const [reducer, methodsFactory] = useMemo<
    [Reducer<S, ActionUnion<R>>, Methods<S, R>]
  >(() => {
    let methods;
    let patchListener: PatchListener | undefined;

    if (typeof methodOrOptions === 'function') {
      methods = methodOrOptions;
    } else {
      methods = methodOrOptions.methods;
      patchListener = methodOrOptions.patchListener;
    }

    return [
      (state, action) => {
        const [
          nextState,
          patches,
          inversePatches,
        ] = (produceWithPatches as any)(state, (draft) => {
          switch (action.type) {
            case HISTORY_ACTIONS.UNDO: {
              return history.undo(draft);
            }
            case HISTORY_ACTIONS.REDO: {
              return history.redo(draft);
            }
            case HISTORY_ACTIONS.CLEAR: {
              history.clear();
              return {
                ...draft,
              };
            }
            default:
              methods(draft)[action.type](...action.payload);
          }
        });
        console.log('log', action, {
          state,
          nextState,
          patches,
          inversePatches,
        });

        if (patchListener) {
        }
        return (produce as any)(
          state,
          (draft: S) => methods(draft)[action.type](...action.payload),
          patchListener
        );
      },
      methods,
    ];
  }, [history, methodOrOptions]);
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('state', state);
  const callbacks = useMemo(() => {
    const actionTypes: ActionUnion<R>['type'][] = Object.keys(
      methodsFactory(state)
    );
    console.log('actionTypes', actionTypes);
    return actionTypes.reduce((accum, type) => {
      accum[type] = (...payload) => dispatch({ type, payload });
      return accum;
    }, {} as CallbacksFor<typeof methodsFactory>);
  }, [methodsFactory, state]);

  return [state, callbacks];
};
