import { createStore } from '../reprox';
import { store } from '../reprox/store';
import { createUseStore, useSharedRef } from './hooks';

const useStore = createUseStore(store);

export { useStore, createStore, useSharedRef };
