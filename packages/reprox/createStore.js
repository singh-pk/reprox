import { store } from './store';

function createStore(initialState) {
  const subscribers = {};
  const INITIAL_STATE_CLONE = structuredClone(initialState);

  const arrHandler = selector => {
    return {
      set: (target, prop, val, receiver) => {
        if (prop === 'length') {
          subscribers[selector]?.forEach(({ forceUpdate }) => forceUpdate());
        }

        return Reflect.set(target, prop, val, receiver);
      },

      get: (target, prop, receiver) => {
        const val = Reflect.get(target, prop, receiver);

        switch (prop) {
          case 'clear':
            return () => Reflect.set(target, 'length', 0);

          case 'reset':
            return () => {
              Reflect.set(target, 'length', 0);

              const cloned = structuredClone(INITIAL_STATE_CLONE[selector]);

              for (let i = 0; i < cloned.length; i++) {
                Reflect.set(target, i.toString(), cloned[i]);
              }
            };

          default:
            return val;
        }
      }
    };
  };

  const handler = {
    set: (target, prop, val, receiver) => {
      const newVal = Reflect.set(target, prop, val, receiver);
      subscribers[prop]?.forEach(({ forceUpdate }) => forceUpdate());
      return newVal;
    },

    get: (target, prop, receiver) => {
      const val = Reflect.get(target, prop, receiver);

      if (val instanceof Function) {
        return function (...args) {
          return val.apply(this === receiver ? target : this, args);
        };
      }

      if (typeof val === 'object' && val !== null) {
        if (val.constructor === Array) {
          return new Proxy(val, arrHandler(prop));
        }

        return new Proxy(val, handler);
      }

      return val;
    }
  };

  store.state = new Proxy(initialState, handler);

  store.subscribe = ({ selector, forceUpdate }) => {
    const key = Symbol();

    if (!subscribers[selector]) {
      subscribers[selector] = [{ key, forceUpdate }];
    } else {
      subscribers[selector].push({ key, forceUpdate });
    }

    return () => {
      subscribers[selector] = subscribers[selector].filter(d => d.key !== key);
    };
  };

  return store;
}

export default createStore;
