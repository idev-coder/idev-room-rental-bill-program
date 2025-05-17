import * as React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Divider,
    IconButton,
    Typography,
    Slide,
    Grid
} from '@idev-coder/idev-ui'
import {
    GridActionsCellItem,
} from '@idev-coder/idev-ui/data-grid'
import InvoiceTable from '../InvoiceTable';
import isElectron from '../../lib/isElectron';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function InvoiceByRoomDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <GridActionsCellItem
                icon={<i className="fa-duotone fa-file-invoice"></i>}
                label="Invoice"
                sx={{
                    color: 'primary.main',
                }}
                onClick={handleClickOpen}
            />


            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                style={{
                    marginTop: isElectron() ? 30 : 0
                }}
            >
                <DialogTitle id="responsive-dialog-title">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {/* <Typography>{props.row.name}</Typography> */}
                            {props.row.name}
                        </Grid>
                        <Grid item xs={6} style={{
                            display: 'flex',
                            justifyContent: 'end',
                        }}>
                            <IconButton color="primary" aria-label="close" onClick={handleClose}>
                                <i className="fa-duotone fa-xmark"></i>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <InvoiceTable row={props.row}></InvoiceTable>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}