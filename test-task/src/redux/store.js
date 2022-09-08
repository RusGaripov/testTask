import { configureStore } from '@reduxjs/toolkit';
import { linksReducer } from './slices/links';
import { authReducer } from './slices/auth';

const store = configureStore({
    reducer: {
        links: linksReducer,
        auth: authReducer,
    },
});

export default store;