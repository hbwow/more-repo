class EventEmitter {
  private events: { [key: string]: Function[] };
  constructor() {
    this.events = {};
  }

  // 注册监听器
  on(eventName: string, listener: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
  }

  // 触发事件
  emit(eventName: string, ...args: any[]) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((listener) => listener(...args));
    }
  }

  // 移除监听器
  off(eventName: string, listenerToRemove: Function) {
    if (!this.events[eventName]) return;

    this.events[eventName] = this.events[eventName].filter(
      (listener) => listener !== listenerToRemove,
    );
  }
}

// 使用示例

export const emitter = new EventEmitter();
