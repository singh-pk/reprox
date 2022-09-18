const refMap = new Proxy(
  {},
  {
    set: (target, key, value) => {
      if (!target[key]) {
        Reflect.set(target, key, value);
      }

      return target;
    }
  }
);

function useSharedRef(key) {
  if (!key || typeof key !== 'string') {
    throw new Error(
      `Expected key with typeof string, instead got ${key} with a typeof ${typeof key}.`
    );
  }

  if (refMap[key] === undefined) {
    refMap[key] = { current: null };
  }

  return refMap[key];
}

export default useSharedRef;
