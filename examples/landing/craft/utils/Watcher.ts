import isEqualWith from 'lodash/isEqualWith';

/**
 * TODO 添加到useMethods
 * 观察者
 * 观察订阅的人
 */
export class Watcher<S> {
  getState: () => S;
  subscribers: Subscriber[] = [];

  constructor(getState: () => S) {
    this.getState = getState;
  }

  /**
   * 添加一个订阅者
   */
  subscribe<C>(
    collector: (state: S) => C,
    onChange: (collected: C) => void,
    collectOnCreate?: boolean
  ): () => void {
    const subscriber = new Subscriber(
      collector.bind(this, this.getState()),
      onChange,
      collectOnCreate
    );
    this.subscribers.push(subscriber);
    return this.unsubscribe.bind(this, subscriber);
  }

  /**
   * 删除一个订阅者
   * @param subscriber
   */
  unsubscribe(subscriber) {
    if (this.subscribers.length) {
      const index = this.subscribers.indexOf(subscriber);
      if (index > -1) this.subscribers.splice(index, 1);
    }
  }
}

/**
 * 订阅者
 */
class Subscriber {
  collected: any; // 被收集的
  collector: () => any; //收集器, 结果赋值给collected
  onChange: (collected: any) => void;
  id;

  /**
   * 创建一个订阅者
   * @param collector 收集器
   * @param onChange 变化方法
   * @param collectOnCreate 初始化就开始收集
   */
  constructor(collector, onChange, collectOnCreate = false) {
    this.collector = collector;
    this.onChange = onChange;
    if (collectOnCreate) this.collect();
  }

  collect() {
    try {
      const recollect = this.collector();
      if (!isEqualWith(recollect, this.collected)) {
        this.collected = recollect;
        if (this.onChange) this.onChange(this.collected);
      }
    } catch (e) {
      console.warn(e);
    }
  }
}
