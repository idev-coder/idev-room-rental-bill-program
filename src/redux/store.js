import { configureStore } from "@reduxjs/toolkit";
import screenSizeReducer from "./screen-size";

export default configureStore({
    reducer: {
        screenSize: screenSizeReducer,
    },
});
