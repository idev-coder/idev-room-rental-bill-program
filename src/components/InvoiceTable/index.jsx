import * as React from 'react';

import {
    Box,
    Button,
    Grid
} from '@idev-coder/idev-ui'
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridToolbarQuickFilter
} from '@idev-coder/idev-ui/data-grid'
import { useSelector } from 'react-redux'

import { randomId } from '@mui/x-data-grid-generator';
import { selectInnerHeight } from '../../redux/screen-size';
import InvoiceDialog from '../InvoiceDialog';
import isElectron from '../../lib/isElectron';
import axios from '../../lib/http';

function EditToolbar(props) {
    const { setRows, setRowModesModel, room } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, name: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Grid container spacing={2}>
                <Grid item xs={6}>

                    <GridToolbarQuickFilter></GridToolbarQuickFilter>
                </Grid>
                <Grid item xs={6} style={{
                    display: 'flex',
                    justifyContent: 'end',
                }}>
                    <InvoiceDialog room={room} title="สร้างบิลค่าเช่า" mode="created"></InvoiceDialog>

                </Grid>
            </Grid>

        </GridToolbarContainer>
    );
}

export default function InvoiceTable(props) {
    const innerHeight = useSelector(selectInnerHeight)
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
        if (isElectron()) {
            window.api.invoice.destroy({
                options: {
                    where: {
                        id: id
                    }
                }
            })
        } else {
            axios.post("/invoices/destroy", {
                options: {
                    where: {
                        id: id
                    }
                }
            })
        }
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
  
        if (isElectron()) {
            window.api.invoice.findByPk({ id: newRow.id }).then((invoice) => {
           
                if (invoice) {
                    window.api.invoice.update({
                        body: { ...updatedRow }, options: {
                            where: {
                                id: updatedRow.id
                            }
                        }
                    }).then((invoiceUpdate) => {
                       
                    })
                } else {
                    window.api.invoice.create({ body: { ...updatedRow } }).then((invoiceCreate) => {
                      
                    })
                }
            })
        } else {
            axios.post("/invoices/findByPk", { id: newRow.id }).then(({data:invoice}) => {
               
                if (invoice) {
                    axios.post("/invoices/update", {
                        body: { ...updatedRow }, options: {
                            where: {
                                id: updatedRow.id
                            }
                        }
                    }).then(({data:invoiceUpdate}) => {
                       
                    })
                } else {
                    axios.post("/invoices/create", { body: { ...updatedRow } }).then(({data:invoiceCreate}) => {
                        
                    })
                }
            })
        }

        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: 'date',
            headerName: 'เดือน',
            width: 200,
            editable: false,
        },
        {
            field: 'room',
            headerName: 'ห้อง',
            width: 100,
            editable: false,
        },
        {
            field: 'total',
            headerName: 'จำนวนเงิน',
            width: 200,
            editable: false,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 200,
            cellClassName: 'actions',
            getActions: ({ id, row }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<i className="fa-duotone fa-floppy-disk"></i>}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<i className="fa-duotone fa-xmark"></i>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <InvoiceDialog room={props.row} title="บิลค่าเช่า" mode="view" row={row} ></InvoiceDialog>,
                    <InvoiceDialog room={props.row} title="แก้ไขบิลค่าเช่า" mode="updated" row={row}></InvoiceDialog>,
                    <GridActionsCellItem
                        icon={<i className="fa-duotone fa-delete-left"></i>}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    React.useEffect(() => {
        if (isElectron()) {
            window.api.invoice.findAll({
                options: {
                    where: {
                        room: props.row.name
                    }
                }
            }).then((invoice) => {
             
                setRows([...invoice])
            })
        } else {
            axios.post("/invoices/findAll", {
                options: {
                    where: {
                        room: props.row.name
                    }
                }
            }).then(({data:invoice}) => {
              
                setRows([...invoice])
            })
        }
    }, [])

    return (
        <Box
            sx={{
                maxHeight: innerHeight - 50,
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel, room: props.row },
                }}
            />
        </Box>
    );
}