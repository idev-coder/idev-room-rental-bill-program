import * as React from "react";
// import { arrayOf, node, shape, string } from "prop-types";
import { Box } from "@idev/ui";
import { Outlet } from "react-router-dom";

export function VerticalTabs() {

    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                height: "100vh",
            }}
        >
            <div
                style={{
                    height: "100vh",
                    width: "100vw",
                    position: "fixed",
                }}
            >
                <div
                    style={{
                        height: 30,
                        width: "inherit",
                    }}
                ></div>
                <div
                    style={{
                        height: "inherit",
                        display: "flex",
                    }}
                >

                    <div
                        style={{
                            width: "100%",
                        }}
                    >
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </Box>
    );
}

export default VerticalTabs;
