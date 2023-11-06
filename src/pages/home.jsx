import * as React from "react";
import { Typography, Box } from "@idev/ui";
// import { Outlet } from "react-router-dom";
import RoomTable from "../components/RoomTable";


export function Home() {

    return (
        <Box sx={{ padding: "10px 25px" }}>
            {/* <Typography variant="h3" gutterBottom>
                สวัสดี
            </Typography> */}
            {/* <Outlet /> */}
            <RoomTable></RoomTable>
        </Box>
    );
}

export default Home;