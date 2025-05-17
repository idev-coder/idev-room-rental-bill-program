import { BrowserRouter } from "react-router-dom";
import router, { MainRouter } from "./routes/main";
import React from "react";
import { useDispatch } from "react-redux";
import { updateScreen } from "./redux/screen-size";
import { ThemeProvider } from '@idev-coder/idev-ui';
import theme from './theme';
import 'dayjs/locale/th';

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
  

    dispatch(
      updateScreen({
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
      })
    );
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter></MainRouter>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
