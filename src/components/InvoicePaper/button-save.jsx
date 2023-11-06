import * as React from 'react';

import {
    Box,
    Button
} from '@idev/ui';

export default function ButtonSave(props) {

    return (
        <Box sx={{
            position: 'fixed',
            bottom: '18px',
            right: '37px',
        }}>
            <Button variant="contained" style={{
                height: '64px',
                width: '64px',
                borderRadius: '100px',
                fontSize: '24px',
            }}
            onClick={() => {
                props.onClick()
            }}
            >
                <i className="fa-duotone fa-floppy-disk"></i>
            </Button>
        </Box >
    );
}