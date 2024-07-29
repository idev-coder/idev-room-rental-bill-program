import React, { useState, useEffect, useCallback, useRef } from "react";
import { bool, number } from "prop-types";
import { useDispatch } from "react-redux";
import { updateScreen } from "../../redux/screen-size";

export function WindowControls({
    disableMaximize,
    disableMinimize,
    browserWindowId,
}) {
    const [isMaximized, setIsMaximized] = useState(false);
    const remoteBrowserWindowId = useRef(browserWindowId);
    const { windowControls } = window;
    const dispatch = useDispatch();
    useEffect(() => {
        const onMaximimizeStateChange = (
            event,
            isWindowMaximumized,
            targetBrowserWindowId,
            size
        ) => {
            if (targetBrowserWindowId === remoteBrowserWindowId.current) {
                setIsMaximized(isWindowMaximumized);
                dispatch(
                    updateScreen({
                        innerHeight: window.innerHeight,
                        innerWidth: window.innerWidth,
                    })
                );
            }
        };

        if (windowControls) {
            windowControls.changeMaximumize(onMaximimizeStateChange)

            const updateRemoteBrowserWindowId = async () => {
                remoteBrowserWindowId.current = await windowControls.initialize(browserWindowId)
            };
            updateRemoteBrowserWindowId().finally(() => null);

            return () => {
                windowControls.changeMinimumize(onMaximimizeStateChange)
            };
        }
    }, [browserWindowId]);

    const setMaximumize = useCallback(() => {
        windowControls && windowControls.setMaximumize(browserWindowId)
    }, [browserWindowId]);

    const setMinimumize = useCallback(() => {
        windowControls && windowControls.setMinimumize(browserWindowId)
    }, [browserWindowId]);

    const setClose = useCallback(() => {
        windowControls && windowControls.close(browserWindowId);
    }, [browserWindowId]);

    return (
        <div className="window-controls">
            <button
                aria-label="minimize"
                tabIndex={-1}
                className="window-control window-minimize"
                disabled={disableMinimize}
                onClick={setMinimumize}
            >
                <svg aria-hidden="true" version="1.1" width="10" height="10">
                    <path d="M 0,5 10,5 10,6 0,6 Z" />
                </svg>
            </button>
            <button
                aria-label="maximize"
                tabIndex={-1}
                className="window-control window-maximize"
                disabled={disableMaximize}
                onClick={setMaximumize}
            >
                <svg aria-hidden="true" version="1.1" width="10" height="10">
                    <path
                        d={
                            isMaximized
                                ? "m 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z"
                                : "M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z"
                        }
                    />
                </svg>
            </button>
            <button
                aria-label="close"
                tabIndex={-1}
                className="window-control window-close"
                onClick={setClose}
            >
                <svg aria-hidden="true" version="1.1" width="10" height="10">
                    <path d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z" />
                </svg>
            </button>
        </div>
    );
}

WindowControls.propTypes = {
    disableMinimize: bool,
    disableMaximize: bool,
    browserWindowId: number,
};

export default WindowControls;
