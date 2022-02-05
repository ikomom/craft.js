import { applyPatches, Patch } from 'immer';

export const HISTORY_ACTIONS = {
  UNDO: 'HISTORY_UNDO', // 撤销
  REDO: 'HISTORY_REDO', // 重做
  THROTTLE: 'HISTORY_THROTTLE', // 节流
  IGNORE: 'HISTORY_IGNORE', // 忽略
  MERGE: 'HISTORY_MERGE', // 合并
  CLEAR: 'HISTORY_CLEAR', // 清除
};
type Timeline = Array<{
  patches: Patch[];
  inversePatches: Patch[];
  timestamp: number;
}>;

/**
 * 配合immer做的时间线
 */
export class History {
  timeline: Timeline = [];
  pointer = -1;

  add(patches: Patch[], inversePatches: Patch[]) {
    if (patches.length === 0 && inversePatches.length === 0) return;

    this.pointer++;
    this.timeline.length = this.pointer;
    this.timeline[this.pointer] = {
      patches,
      inversePatches,
      timestamp: Date.now(),
    };
  }

  /**
   * 节流增加
   * @param patches
   * @param inversePatches
   * @param throttleRate
   */
  throttleAdd(
    patches: Patch[],
    inversePatches: Patch[],
    throttleRate: number = 500
  ) {
    if (patches.length === 0 && inversePatches.length === 0) return;

    // 与上一个插入时间比对
    if (this.timeline.length && this.pointer >= 0) {
      const {
        patches: currPatches,
        inversePatches: currInversePatches,
        timestamp,
      } = this.timeline[this.pointer];
      const now = Date.now();
      const diff = now - timestamp;
      // 未超过时间合并到一个批次
      if (diff < throttleRate) {
        this.timeline[this.pointer] = {
          timestamp,
          patches: [...currPatches, ...patches],
          inversePatches: [...inversePatches, ...currInversePatches],
        };
        return;
      }
    }
    this.add(patches, inversePatches);
  }

  /**
   * 合并到最后一个history
   * @param patches
   * @param inversePatches
   */
  mergeToLast(patches: Patch[], inversePatches: Patch[]) {
    if (patches.length === 0 && inversePatches.length === 0) return;
    if (this.timeline.length && this.pointer >= 0) {
      const {
        patches: currPatches,
        inversePatches: currInversePatches,
        timestamp,
      } = this.timeline[this.pointer];

      this.timeline[this.pointer] = {
        timestamp,
        patches: [...currPatches, ...patches],
        inversePatches: [...inversePatches, ...currInversePatches],
      };
      return;
    }
    this.add(patches, inversePatches);
  }

  /**
   * 撤销
   * @param state
   */
  undo(state) {
    if (!this.canUndo()) return;
    const { inversePatches } = this.timeline[this.pointer];
    this.pointer = this.pointer - 1;
    return applyPatches(state, inversePatches);
  }

  /**
   * 重做
   * @param state
   */
  redo(state) {
    if (!this.canRedo()) {
      return;
    }

    this.pointer = this.pointer + 1;
    const { patches } = this.timeline[this.pointer];
    return applyPatches(state, patches);
  }
  clear() {
    this.timeline = [];
    this.pointer = -1;
  }

  canUndo() {
    return this.pointer >= 0;
  }

  canRedo() {
    return this.pointer < this.timeline.length - 1;
  }
}
