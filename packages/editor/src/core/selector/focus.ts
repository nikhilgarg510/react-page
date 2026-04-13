import type { RootState } from '../types/state';
import { findNodeInState } from './editable';

export const focus = (state: RootState) =>
  state && state.reactPage && state.reactPage.focus;

// Memoize allFocusedNodeIds to avoid returning a new array reference on every call
let _prevNodeIds: string[] | undefined;
let _prevState: RootState | undefined;
let _prevResult: string[] = [];

const shallowArrayEqual = (a: string[], b: string[]): boolean => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

export const allFocusedNodeIds = (state: RootState) => {
  const nodeIds = focus(state)?.nodeIds;
  // If both the nodeIds reference and the full state are unchanged, return cached result
  if (nodeIds === _prevNodeIds && state === _prevState) {
    return _prevResult;
  }
  _prevNodeIds = nodeIds;
  _prevState = state;
  const newResult =
    nodeIds?.filter((n) => findNodeInState(state, n)?.node) ?? [];
  // Only return a new array reference if the content actually changed
  if (shallowArrayEqual(newResult, _prevResult)) {
    return _prevResult;
  }
  _prevResult = newResult;
  return _prevResult;
};

export const singleFocusedNode = (state: RootState) => {
  const nodeIds = allFocusedNodeIds(state);

  if (nodeIds?.length === 1) return nodeIds[0];
  return null;
};
