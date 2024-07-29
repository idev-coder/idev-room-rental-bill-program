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
    Grid,
    Box
} from '@idev/ui'
import {
    GridActionsCellItem,
} from '@idev/ui/data-grid'
import InvoicePaper from '../InvoicePaper';
import isElectron from '../../lib/isElectron';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function InvoiceDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {props.mode === "created" && <Button color="primary" startIcon={<i className="fa-duotone fa-plus"></i>} onClick={handleClickOpen}>
                เพิ่มบิลค่าเช่า
            </Button>}

            {props.mode === "updated" && <GridActionsCellItem
                icon={<i className="fa-duotone fa-pen-to-square"></i>}
                label="Edit"
                onClick={handleClickOpen}
                sx={{
                    color: 'primary.main',
                }}
            />}

            {props.mode === "view" && <GridActionsCellItem
                icon={<i className="fa-duotone fa-eye"></i>}
                label="View"
                onClick={handleClickOpen}
                sx={{
                    color: 'primary.main',
                }}
            />}


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
                            {props.title}
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
                    <Box sx={{
                        bgcolor: 'rgb(0 0 0 / 66%)', height: '85vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <InvoicePaper mode={props.mode} onClose={handleClose} room={props.room} row={props.row} ></InvoicePaper>

                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}