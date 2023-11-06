import * as React from "react";
import {
    Route,
    Routes,
    useNavigate,
    useLocation
} from "react-router-dom";
import NoMatch from "../pages/no-match";
import Frame from "../components/Frame";
import VerticalTabs from "../components/VerticalTabs";
import Home from "../pages/home";
import Icon from "../icon.ico";
import { useSelector } from "react-redux";
import { selectInnerHeight } from "../redux/screen-size";



export function MainRouter() {
    let location = useLocation();
    const navigate = useNavigate();
    const innerHeight = useSelector(selectInnerHeight);

    React.useEffect(() => {
        console.log(innerHeight);
    }, [innerHeight]);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Frame icon={Icon}>
                    </Frame>
                }
            >
                <Route path="" element={<VerticalTabs></VerticalTabs>}>
                    <Route path="" Component={Home} />
                  
                </Route>
                {/* ... etc. */}
                <Route path="*" Component={NoMatch} />
            </Route>
        </Routes>
    );
}

export default MainRouter;
