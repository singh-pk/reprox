### `Warning! This project is still in development. Please do not use it in your production code.`

#### Pass your initial state to createStore

createStore must be passed at the root

```jsx
import { createStore } from 'react-reprox'

const INITIAL_STATE = {
  counter: { counter1: 0 }
}

createStore(INITIAL_STATE);
```

or, if you are using vanilla js

```js
import { createStore } from 'reprox'

const store = createStore(INITIAL_STATE);
```

And you are all set. Just like that.

#### To use the state in your component

Just use `useStore` and pass the required selectors for effective re-rendering

```jsx
import { store } from 'react-reprox'

const Counter = ({ stateKey }) => {
  const state = useStore([stateKey]);

  return (
    <div>
      <h2>{state.counter[stateKey]}</h2>

      <button
        onClick={() => {
          state.counter[stateKey] += 1;
        }}
      >
        +
      </button>
      <button>-</button>
      <button>Reset</button>
    </div>
  );
};
```

```jsx
import Counter from './Counter'

const App = () => {
  return <Counter stateKey='counter1' />
}
```

#### Share ref in your component

You can share ref easily by using `useSharedRef` and passing in a key

```jsx
import { useSharedRef } from 'react-reprox'

const App = () => {
  const ref = useSharedRef('appRef');

  <div ref={ref}>
    ...
  </div>
}
```

and you can use the current value of this ref anywhere in your application by passing in the same key

```jsx
import { useSharedRef } from 'react-reprox'

const SomeComponent = () => {
  const appRef = useSharefRef('appRef');

  useEffect(() => {
    console.log(appRef.current);
  }, [])

  <div>
    ...
  </div>
}
```

#### Todo before beta release

```
- [ ] Solving potential tearing issue
- [ ] Rethink selectors, if it's really necessary, and if not then how can we give developers the option to controll re-renders on state change
- [ ] Option to add middlewares
- [ ] Handling async func
- [ ] Option to sync url state with proxy state
- [ ] Adding typescript
- [ ] Setting up the build and publish process
```

#### Optional todo before beta release

```
- [ ] useSharedRef should have the option to re-render the component when the current changes from null to not null
```
