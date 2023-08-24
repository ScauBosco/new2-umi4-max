class EventBus {
  subscribers = {};

  subscribe = (event, callback) => {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }

    this.subscribers[event].push(callback);
  };

  unsubscribe = (event, callback) => {
    if (this.subscribers[event]) {
      this.subscribers[event] = this.subscribers[event].filter(
        (cb) => cb !== callback,
      );
    }
  };

  publish = (event: string, data?: any) => {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach((callback) => {
        callback(data);
      });
    }
  };
}

export default new EventBus();
