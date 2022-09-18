import { useEffect, useState } from 'react';

const createUseStore = store => {
  return (selectors = []) => {
    const [, forceUpdate] = useState();

    useEffect(() => {
      const subscriptions = [];

      selectors.forEach(selector =>
        subscriptions.push(
          store.subscribe({ selector, forceUpdate: () => forceUpdate({}) })
        )
      );

      return () => {
        subscriptions.forEach(d => d());
      };
    }, []);

    return store.state;
  };
};

export default createUseStore;
