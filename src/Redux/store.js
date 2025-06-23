import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userSlice';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined; // Let reducers initialize the state
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Failed to load state", e);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.warn("Failed to save state", e);
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState,
});

// Subscribe to store changes
store.subscribe(() => {
  saveState({
    user: store.getState().user,
  });
});
