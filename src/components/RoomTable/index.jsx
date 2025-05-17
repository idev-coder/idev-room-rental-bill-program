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
import InvoiceByRoomDialog from '../InvoiceByRoomDialog';
import isElectron from '../../lib/isElectron';
import axios from '../../lib/http';

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

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
                    <Button color="primary" startIcon={<i className="fa-duotone fa-plus"></i>} onClick={handleClick}>
                        เพิ่มห้อง
                    </Button>
                </Grid>
            </Grid>

        </GridToolbarContainer>
    );
}

export default function RoomTable() {
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
            window.api.room.destroy({
                options: {
                    where: {
                        id: id
                    }
                }
            })
        } else {
            axios.post("/rooms/destroy", {
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
            window.api.room.findByPk({ id: newRow.id }).then((room) => {
              
                if (room) {
                    window.api.room.update({
                        body: { ...updatedRow }, options: {
                            where: {
                                id: updatedRow.id
                            }
                        }
                    }).then((roomUpdate) => {
                       
                    })
                } else {
                    window.api.room.create({ body: { ...updatedRow } }).then((roomCreate) => {
                        
                    })
                }
            })
        } else {
            axios.post("/rooms/findByPk", { id: newRow.id }).then(({data:room}) => {
               
                if (room) {
                    axios.post("/rooms/update", {
                        body: { ...updatedRow }, options: {
                            where: {
                                id: updatedRow.id
                            }
                        }
                    }).then(({data:roomUpdate}) => {
                       
                    })
                } else {
                    axios.post("/rooms/create", { body: { ...updatedRow } }).then(({data:roomCreate}) => {
                        
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
            field: 'name',
            headerName: 'ห้อง',
            width: 200,
            editable: true,
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
                    <InvoiceByRoomDialog id={id} row={row}></InvoiceByRoomDialog>,
                    <GridActionsCellItem
                        icon={<i className="fa-duotone fa-pen-to-square"></i>}
                        label="Edit"
                        onClick={handleEditClick(id)}
                        sx={{
                            color: 'primary.main',
                        }}
                    />,
                    <GridActionsCellItem
                        icon={<i className="fa-duotone fa-delete-left"></i>}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        className="textPrimary"
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    React.useEffect(() => {
        if (isElectron()) {
            window.api.room.findAll({}).then((room) => {
                setRows([...room])
            })
        } else {
            axios.post("/rooms/findAll", {}).then(({data:room}) => {
              
                setRows([...room])
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
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </Box>
    );
}