import * as React from 'react';
import {
    Paper,
    styled
} from '@idev/ui'
import LOGO from './icon.png'
import MenuExportDoc from './menu-export-doc';
import ButtonSave from './button-save';
import { randomId } from '@mui/x-data-grid-generator';

const InputBase = styled('input')`
border: 0px;
width: 100%;
height: 100%;
background-color: transparent;
padding: 0px;
margin: 0;
font-family: "Kanit";
font-weight: 400;
font-size: 0.8125rem;
height: 13px;
&:focus {
    background-color: transparent;
    outline: 3px solid transparent;
}
`

export default function InvoicePaper(props) {
    const [data, setData] = React.useState({
        id: randomId(),
        date: "",
        table: [
            {
                no: "1",
                description: {
                    name: "ค่าเช่าห้อง",
                    unitBefor: "",
                    unitAffter: "",
                },
                amount: ""
            },
            {
                no: "2",
                description: {
                    name: "ค่าไฟฟ้า",
                    unitBefor: "",
                    unitAffter: "",
                },
                amount: ""
            },
            {
                no: "3",
                description: {
                    name: "ค่าน้ำประปา",
                    unitBefor: "",
                    unitAffter: "",
                },
                amount: ""
            },
            {
                no: "4",
                description: {
                    name: "ค่าโทรศัพท์",
                    unitBefor: "",
                    unitAffter: "",
                },
                amount: ""
            },
            {
                no: "5",
                description: {
                    name: "อื่นๆ",
                    unitBefor: "",
                    unitAffter: "",
                },
                amount: ""
            },
            {
                no: "",
                description: {
                    name: "",
                    unitBefor: "",
                    unitAffter: "",
                },
                amount: ""
            }
        ],
        room: props.room.name,
        total: ""
    })
    const invoiceRef = React.useRef(null);
    const invoice2Ref = React.useRef(null);

    function total(table) {
        let newTotal = table.map(({ amount }) => {
            if (amount) {
                return parseFloat(amount)
            } else {
                return 0
            }
        })

        let t = newTotal.reduce((x, y) => parseFloat(x) + parseFloat(y), 0);
        if (props.mode === "view") {
            return new Intl.NumberFormat('th-TH', {
                style: 'currency',
                currency: 'THB',
            }).format(t).replace('฿', '')
        } else {
            return t
        }

    }

    function amount(amount) {
        if (props.mode === "view") {
            return new Intl.NumberFormat('th-TH', {
                style: 'currency',
                currency: 'THB',
            }).format(amount).replace('฿', '')
        } else {
            return amount
        }
    }

    React.useEffect(() => {
        console.log(props);
        if (props.mode === "created") {
            window.api.invoice.findAll({ options: { order: [['createdAt', 'DESC']] } }).then((invoices) => {
                console.log(invoices);
                if (invoices.length > 0) {
                    const newTable = data.table.map((list) => {
                        if (list.no === "2") {
                            return { ...list, description: { ...list.description, unitBefor: invoices[0].table.find(({ no }) => no === list.no).description.unitAffter } }
                        }

                        if (list.no === "3") {
                            return { ...list, description: { ...list.description, unitBefor: invoices[0].table.find(({ no }) => no === list.no).description.unitAffter } }
                        }

                        return list
                    })
                    setData({ ...data, table: newTable, total: total(data.table) })
                }
            })
        }

        if (props.mode === "updated" || props.mode === "view") {
            window.api.invoice.findByPk({ id: props.row.id }).then((invoice) => {
                console.log(invoice);

                if (invoice) {

                    setData({ ...invoice })
                }
            })
        }
    }, [])


    return (
        <React.Fragment>
            <Paper
                ref={invoiceRef}
                style={{
                    display: 'flex'
                }}
                sx={{
                    maxWidth: '9in',
                    minWidth: '9in',
                    maxHeight: '5.5in',
                    minHeight: '5.5in'
                }}
                elevation={0}
                square>
                <div style={{
                    maxWidth: '0.5in',
                    minWidth: '0.5in',
                    maxHeight: '5.5in',
                    minHeight: '5.5in',

                }}></div>
                <div style={{
                    maxWidth: '8in',
                    minWidth: '8in',
                    maxHeight: '5.5in',
                    minHeight: '5.5in',
                    borderRight: '1px solid #3333330f',
                    borderLeft: '1px solid #3333330f',
                    borderStyle: 'none dashed none dashed',
                    display: 'flex'
                }}>
                    <div style={{
                        maxWidth: '1in',
                        minWidth: '1in',
                        maxHeight: '5.5in',
                        minHeight: '5.5in',
                    }}></div>
                    <div style={{
                        maxWidth: '6in',
                        minWidth: '6in',
                        maxHeight: '5.5in',
                        minHeight: '5.5in',
                    }}>
                        <div style={{
                            maxWidth: '6in',
                            minWidth: '6in',
                            maxHeight: '1.4in',
                            minHeight: '1.4in',
                            display: 'flex'
                        }}>

                            <div style={{
                                maxWidth: '0.8in',
                                minWidth: '0.8in',
                                maxHeight: '1.4in',
                                minHeight: '1.4in',
                            }}>
                                <div style={{
                                    maxWidth: '0.8in',
                                    minWidth: '0.8in',
                                    maxHeight: '0.3in',
                                    minHeight: '0.3in',
                                }}></div>
                                <div style={{
                                    maxWidth: '0.8in',
                                    minWidth: '0.8in',
                                    maxHeight: '1.2in',
                                    minHeight: '1.2in',
                                }}>
                                    <img src={LOGO} style={{
                                        width: 60
                                    }} />
                                </div>
                            </div>
                            <div style={{
                                maxWidth: '3.2in',
                                minWidth: '3.2in',
                                maxHeight: '1.4in',
                                minHeight: '1.4in',
                            }}>
                                <div style={{
                                    maxWidth: '3.2in',
                                    minWidth: '3.2in',
                                    maxHeight: '0.3in',
                                    minHeight: '0.3in',
                                }}></div>
                                <div style={{
                                    maxWidth: '3.2in',
                                    minWidth: '3.2in',
                                    maxHeight: '1.2in',
                                    minHeight: '1.2in',
                                }}>
                                    <div>
                                        <div id="title-header">{"GRAPE APARTMENT"}</div>
                                        <div style={{
                                            fontSize: 13
                                        }}>
                                            <div>2677/27-28 ซอยตรงข้ามโรงไม้ขีด, แขวงบางคอแหลม</div>
                                            <div>เขตบางคอแหลม กทม 10120</div>
                                            <div>โทร : 0-2291-3856, 0-2291-3858, 0-2291-3859</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div style={{
                                maxWidth: '2in',
                                minWidth: '2in',
                                maxHeight: '1.4in',
                                minHeight: '1.4in',
                            }}>
                                <div style={{
                                    maxWidth: '2in',
                                    minWidth: '2in',
                                    maxHeight: '0.3in',
                                    minHeight: '0.3in',
                                }}></div>
                                <div style={{
                                    maxWidth: '2in',
                                    minWidth: '2in',
                                    maxHeight: '1.2in',
                                    minHeight: '1.2in',
                                }}>
                                    {props.mode === "receipt" && (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'end',
                                        }}>
                                            <table style={{
                                                border: '1px solid'
                                            }}>
                                                <tr>
                                                    <th style={{
                                                        border: '1px solid',
                                                        padding: 10
                                                    }}>{"ใบเสร็จรับเงิน"}</th>
                                                </tr>
                                            </table>

                                        </div>
                                    )}
                                    {props.mode === "copy-receipt" && (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'end',
                                        }}>
                                            <table style={{
                                                border: '1px solid'
                                            }}>
                                                <tr>
                                                    <th style={{
                                                        border: '1px solid',
                                                        padding: 10
                                                    }}>{"สำเนาใบเสร็จรับเงิน"}</th>
                                                </tr>
                                            </table>

                                        </div>
                                    )}
                                    {props.mode === "invoice" && (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'end',
                                        }}>
                                            <table style={{
                                                border: '1px solid'
                                            }}>
                                                <tr>
                                                    <th style={{
                                                        border: '1px solid',
                                                        padding: 10
                                                    }}>{"ใบแจ้งหนี้"}</th>
                                                </tr>
                                            </table>

                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                        <div style={{
                            maxWidth: '6in',
                            minWidth: '6in',
                            maxHeight: '4.1in',
                            minHeight: '4.1in',
                        }}>
                            <div style={{
                                maxWidth: '6in',
                                minWidth: '6in',
                                maxHeight: '0.4in',
                                minHeight: '0.4in',
                                display: 'flex'
                            }}>
                                <div style={{
                                    maxWidth: '3.5in',
                                    minWidth: '3.5in',
                                    maxHeight: '0.4in',
                                    minHeight: '0.4in',
                                    display: 'flex',
                                    alignItems: 'baseline'
                                }}>
                                    <span style={{
                                        fontWeight: 'bold',
                                    }}>ได้รับเงินจากห้องหมายเลข :</span>
                                    <div style={{
                                        width: '1.2in',
                                        borderBottom: '1px solid',
                                        marginLeft: 5,
                                    }}>
                                        <InputBase style={{
                                            textAlign: 'center',
                                            height: '100%'
                                        }}
                                            value={data.room}
                                            onChange={(event) => {
                                                setData({ ...data, room: event.target.value })
                                            }}
                                        ></InputBase>
                                    </div>
                                </div>
                                <div style={{
                                    maxWidth: '2.5in',
                                    minWidth: '2.5in',
                                    maxHeight: '0.4in',
                                    minHeight: '0.4in',
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    justifyContent: 'end'
                                }}>
                                    <span style={{
                                        fontWeight: 'bold',
                                    }}>เดือน :</span>
                                    <div style={{
                                        width: '1.5in',
                                        borderBottom: '1px solid',
                                        marginLeft: 5,
                                    }}>
                                        <InputBase style={{
                                            textAlign: 'center',
                                            height: '100%'
                                        }}
                                            value={data.date}
                                            onChange={(event) => {
                                                setData({ ...data, date: event.target.value })
                                            }}
                                        ></InputBase>
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                maxWidth: '6in',
                                minWidth: '6in',
                                maxHeight: '3.7in',
                                minHeight: '3.7in',
                            }}>
                                <table style={{
                                    maxWidth: '6in',
                                    minWidth: '6in',
                                    border: '1px solid black',
                                    maxHeight: '2.7in',
                                    minHeight: '2.7in',
                                    display: 'contents'
                                }} >

                                    <tbody>
                                        <table style={{
                                            border: '1px solid black',
                                            borderCollapse: 'collapse'
                                        }} >
                                            <tr style={{
                                                background: 'rgba(224, 224, 224, 1)'
                                            }}>
                                                <th style={{
                                                    width: '0.69in',
                                                    height: '0.4in',
                                                    border: '1px solid black'
                                                }}>{"ลำดับที่"}</th>
                                                <th style={{
                                                    width: '3.87in',
                                                    height: '0.4in',
                                                    border: '1px solid black'
                                                }}>{"รายการ"}</th>
                                                <th style={{
                                                    width: '1.3in',
                                                    height: '0.4in',
                                                    border: '1px solid black'
                                                }}>{"จำนวนเงิน"}</th>
                                            </tr>
                                        </table>
                                    </tbody>
                                    <tbody>
                                        <table style={{
                                            border: '1px solid black',
                                            borderCollapse: 'collapse'
                                        }} >
                                            {data.table.map((val, key) => (
                                                <tr key={key}>
                                                    {key === 0 && (<React.Fragment>
                                                        <td style={{
                                                            maxWidth: '0.7in',
                                                            minWidth: '0.69in',
                                                            height: '0.3in',
                                                            border: '1px solid black',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            fontWeight: 'bold',
                                                        }}>{val.no}</td>
                                                        <td style={{
                                                            maxWidth: '3.9in',
                                                            minWidth: '3.87in',
                                                            height: '0.3in',
                                                            border: '1px solid black'
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'baseline',
                                                            }}>
                                                                <div style={{
                                                                    width: '0.8in',
                                                                    fontSize: 14
                                                                }}>{val.description.name}</div>
                                                                <div
                                                                    style={{
                                                                        fontSize: 10
                                                                    }}>{"(รวมค่าบริการแล้ว)"}</div>
                                                            </div>
                                                        </td>
                                                        <td style={{
                                                            width: '1.3in',
                                                            height: '0.3in',
                                                            border: '1px solid black'
                                                        }}>
                                                            <InputBase style={{
                                                                textAlign: 'center',
                                                                height: '100%'
                                                            }}
                                                                value={amount(val.amount)}
                                                                onChange={(event) => {
                                                                    const newTable = data.table.map((v, k) => {
                                                                        if (v.no === val.no) {
                                                                            return { ...v, amount: event.target.value }
                                                                        }

                                                                        return v
                                                                    })

                                                                    setData({ ...data, table: newTable })
                                                                }}
                                                            ></InputBase>
                                                        </td>
                                                    </React.Fragment>)}
                                                    {key === 1 && (<React.Fragment>
                                                        <td style={{
                                                            maxWidth: '0.7in',
                                                            minWidth: '0.69in',
                                                            height: '0.3in',
                                                            border: '1px solid black',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            fontWeight: 'bold',
                                                        }}>{val.no}</td>
                                                        <td style={{
                                                            maxWidth: '3.9in',
                                                            minWidth: '3.87in',
                                                            height: '0.3in',
                                                            border: '1px solid black'
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'baseline',
                                                            }}>
                                                                <div style={{
                                                                    width: '0.8in',
                                                                    fontSize: 14
                                                                }}>{val.description.name}</div>
                                                                <div
                                                                    style={{
                                                                        fontSize: 10,
                                                                        display: 'flex'
                                                                    }}>
                                                                    <div>{"(จดมิเตอร์ครั้งแรก)"}</div>
                                                                    <div style={{
                                                                        width: '0.7in',
                                                                        borderBottom: '1px solid'
                                                                    }}>
                                                                        <InputBase style={{
                                                                            textAlign: 'center',
                                                                            height: '100%'
                                                                        }}
                                                                            value={val.description.unitBefor}
                                                                            onChange={(event) => {

                                                                                const newTable = data.table.map((v, k) => {
                                                                                    if (v.no === val.no) {
                                                                                        return { ...v, description: { ...v.description, unitBefor: event.target.value } }
                                                                                    }

                                                                                    return v
                                                                                })

                                                                                setData({ ...data, table: newTable })
                                                                            }}
                                                                        ></InputBase>
                                                                    </div>
                                                                    <div>{"(จดครั้งหลัง)"}</div>
                                                                    <div style={{
                                                                        width: '0.7in',
                                                                        borderBottom: '1px solid'
                                                                    }}>
                                                                        <InputBase style={{
                                                                            textAlign: 'center',
                                                                            height: '100%'
                                                                        }}
                                                                            value={val.description.unitAffter}
                                                                            onChange={(event) => {
                                                                                const newTable = data.table.map((v, k) => {
                                                                                    if (v.no === val.no) {
                                                                                        return { ...v, description: { ...v.description, unitAffter: event.target.value } }
                                                                                    }

                                                                                    return v
                                                                                })

                                                                                setData({ ...data, table: newTable })
                                                                            }}
                                                                        ></InputBase>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td style={{
                                                            maxWidth: '1.2in',
                                                            minWidth: '1.19in',
                                                            height: '0.3in',
                                                            border: '1px solid black'
                                                        }}><InputBase style={{
                                                            textAlign: 'center',
                                                            height: '100%'
                                                        }}
                                                            value={amount(val.amount)}
                                                            onChange={(event) => {
                                                                const newTable = data.table.map((v, k) => {
                                                                    if (v.no === val.no) {
                                                                        return { ...v, amount: event.target.value }
                                                                    }

                                                                    return v
                                                                })

                                                                setData({ ...data, table: newTable })
                                                            }}
                                                        ></InputBase></td>
                                                    </React.Fragment>)}
                                                    {key === 2 && (<React.Fragment>
                                                        <td style={{
                                                            maxWidth: '0.7in',
                                                            minWidth: '0.69in',
                                                            height: '0.3in',
                                                            border: '1px solid black',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            fontWeight: 'bold',
                                                        }}>{val.no}</td>
                                                        <td style={{
                                                            maxWidth: '3.9in',
                                                            minWidth: '3.87in',
                                                            height: '0.3in',
                                                            border: '1px solid black'
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'baseline',
                                                            }}>
                                                                <div style={{
                                                                    width: '0.8in',
                                                                    fontSize: 14
                                                                }}>{val.description.name}</div>
                                                                <div
                                                                    style={{
                                                                        fontSize: 10,
                                                                        display: 'flex'
                                                                    }}>
                                                                    <div>{"(จดมิเตอร์ครั้งแรก)"}</div>
                                                                    <div style={{
                                                                        width: '0.7in',
                                                                        borderBottom: '1px solid'
                                                                    }}>
                                                                        <InputBase style={{
                                                                            textAlign: 'center',
                                                                            height: '100%'
                                                                        }}
                                                                            value={val.description.unitBefor}
                                                                            onChange={(event) => {

                                                                                const newTable = data.table.map((v, k) => {
                                                                                    if (v.no === val.no) {
                                                                                        return { ...v, description: { ...v.description, unitBefor: event.target.value } }
                                                                                    }

                                                                                    return v
                                                                                })

                                                                                setData({ ...data, table: newTable })
                                                                            }}
                                                                        ></InputBase>
                                                                    </div>
                                                                    <div>{"(จดครั้งหลัง)"}</div>
                                                                    <div style={{
                                                                        width: '0.7in',
                                                                        borderBottom: '1px solid'
                                                                    }}>
                                                                        <InputBase style={{
                                                                            textAlign: 'center',
                                                                            height: '100%'
                                                                        }}
                                                                            value={val.description.unitAffter}
                                                                            onChange={(event) => {
                                                                                const newTable = data.table.map((v, k) => {
                                                                                    if (v.no === val.no) {
                                                                                        return { ...v, description: { ...v.description, unitAffter: event.target.value } }
                                                                                    }

                                                                                    return v
                                                                                })

                                                                                setData({ ...data, table: newTable })
                                                                            }}
                                                                        ></InputBase>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td style={{
                                                            maxWidth: '1.2in',
                                                            minWidth: '1.19in',
                                                            height: '0.3in',
                                                            border: '1px solid black'
                                                        }}><InputBase style={{
                                                            textAlign: 'center',
                                                            height: '100%'
                                                        }}
                                                            value={amount(val.amount)}
                                                            onChange={(event) => {
                                                                const newTable = data.table.map((v, k) => {
                                                                    if (v.no === val.no) {
                                                                        return { ...v, amount: event.target.value }
                                                                    }

                                                                    return v
                                                                })

                                                                setData({ ...data, table: newTable })
                                                            }}
                                                        ></InputBase></td>
                                                    </React.Fragment>)}
                                                    {key === 3 && (<React.Fragment>
                                                        <td style={{
                                                            maxWidth: '0.7in',
                                                            minWidth: '0.69in',
                                                            height: '0.3in',
                                                            border: '1px solid black',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            fontWeight: 'bold',
                                                        }}>{val.no}</td>
                                                        <td style={{
                                                            maxWidth: '3.9in',
                                                            minWidth: '3.87in',
                                                            height: '0.3in',
                                                            border: '1px solid black'
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'baseline',
                                                            }}>
                                                                <div style={{
                                                                    width: '0.8in',
                                                                    fontSize: 14
                                                                }}>{val.description.name}</div>

                                                            </div>
                                                        </td>
                                                        <td style={{
                                                            width: '1.3in',
                                                            height: '0.3in',
                                                            border: '1px solid black'
                                                        }}>
                                                            <InputBase style={{
                                                                textAlign: 'center',
                                                                height: '100%'
                                                            }}
                                                                value={amount(val.amount)}
                                                                onChange={(event) => {
                                                                    const newTable = data.table.map((v, k) => {
                                                                        if (v.no === val.no) {
                                                                            return { ...v, amount: event.target.value }
                                                                        }

                                                                        return v
                                                                    })

                                                                    setData({ ...data, table: newTable })
                                                                }}
                                                            ></InputBase>
                                                        </td>
                                                    </React.Fragment>)}
                                                    {key === 4 && (<React.Fragment>
                                                        <td style={{
                                                            maxWidth: '0.7in',
                                                            minWidth: '0.69in',
                                                            height: '0.3in',
                                                            border: '1px solid black',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            fontWeight: 'bold',
                                                        }}>{val.no}</td>
                                                        <td style={{
                                                            maxWidth: '3.9in',
                                                            minWidth: '3.87in',
                                                            height: '0.3in',
                                                            border: '1px solid black'
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'baseline',
                                                            }}>
                                                                <div style={{
                                                                    width: '0.8in',
                                                                    fontSize: 14
                                                                }}>{val.description.name}</div>

                                                            </div>
                                                        </td>
                                                        <td style={{
                                                            width: '1.3in',
                                                            height: '0.3in',
                                                            border: '1px solid black'
                                                        }}>
                                                            <InputBase style={{
                                                                textAlign: 'center',
                                                                height: '100%'
                                                            }}
                                                                value={amount(val.amount)}
                                                                onChange={(event) => {
                                                                    const newTable = data.table.map((v, k) => {
                                                                        if (v.no === val.no) {
                                                                            return { ...v, amount: event.target.value }
                                                                        }

                                                                        return v
                                                                    })

                                                                    setData({ ...data, table: newTable })
                                                                }}
                                                            ></InputBase>
                                                        </td>
                                                    </React.Fragment>)}
                                                    {key === 5 && (<React.Fragment>
                                                        <td style={{
                                                            maxWidth: '0.7in',
                                                            minWidth: '0.69in',
                                                            height: '0.3in',
                                                            border: '1px solid black',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            fontWeight: 'bold',
                                                        }}>{val.no}</td>
                                                        <td style={{
                                                            maxWidth: '3.9in',
                                                            minWidth: '3.87in',
                                                            height: '0.3in',
                                                            border: '1px solid black'
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'baseline',
                                                            }}>
                                                                <div style={{
                                                                    width: '0.8in',
                                                                    fontSize: 14
                                                                }}>{val.description.name}</div>

                                                            </div>
                                                        </td>
                                                        <td style={{
                                                            width: '1.3in',
                                                            height: '0.3in',
                                                            border: '1px solid black'
                                                        }}>
                                                            {val.amount}
                                                        </td>
                                                    </React.Fragment>)}
                                                </tr>
                                            ))}


                                        </table>
                                    </tbody>
                                    <tfoot>
                                        <table style={{
                                            border: '1px solid black',
                                            borderCollapse: 'collapse'
                                        }} >
                                            <tr>
                                                <td style={{
                                                    maxWidth: '3.6in',
                                                    minWidth: '3.57in',
                                                    height: '0.3in',
                                                    border: '1px solid black'
                                                }}>{""}</td>
                                                <td style={{
                                                    maxWidth: '1in',
                                                    minWidth: '0.99in',
                                                    height: '0.3in',
                                                    border: '1px solid black',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',

                                                }}>{"รวมทั้งสิ้น"}</td>
                                                <td style={{
                                                    maxWidth: '1.3in',
                                                    minWidth: '1.29in',
                                                    height: '0.3in',
                                                    border: '1px solid black'
                                                }}>
                                                    <InputBase style={{
                                                        textAlign: 'center',
                                                        height: '100%'
                                                    }}
                                                        value={total(data.table)}
                                                        onChange={(event) => {
                                                            setData({ ...data, total: event.target.value })
                                                        }}
                                                    ></InputBase>
                                                </td>
                                            </tr>
                                        </table>
                                    </tfoot>
                                </table>
                                <div style={{
                                    maxWidth: '6in',
                                    minWidth: '6in',
                                    maxHeight: '0.8in',
                                    minHeight: '0.8in',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <div style={{
                                        maxWidth: '2in',
                                        minWidth: '2in',
                                        maxHeight: '0.8in',
                                        minHeight: '0.8in',
                                        display: 'grid',
                                        alignItems: 'normal',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}>
                                        <div style={{
                                            width: '1.5in',
                                            height: '0.4in',
                                            borderBottom: '1px solid'
                                        }}></div>
                                        <div>
                                            {"ผู้รับเงิน"}
                                        </div>
                                    </div>
                                    <div style={{
                                        maxWidth: '2in',
                                        minWidth: '2in',
                                        maxHeight: '0.8in',
                                        minHeight: '0.8in',
                                        display: 'grid',
                                        alignItems: 'normal',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}>
                                        <div style={{
                                            width: '1.5in',
                                            height: '0.4in',
                                            borderBottom: '1px solid',
                                            display: 'flex',
                                            alignItems: 'end',
                                        }}>
                                            <InputBase style={{
                                                textAlign: 'center',
                                                // height: '100%'
                                            }}></InputBase>
                                        </div>
                                        <div>
                                            {"วันที่"}
                                        </div>
                                    </div>
                                    <div style={{
                                        maxWidth: '2in',
                                        minWidth: '2in',
                                        maxHeight: '0.8in',
                                        minHeight: '0.8in',
                                        display: 'grid',
                                        alignItems: 'normal',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        maxWidth: '1in',
                        minWidth: '1in',
                        maxHeight: '5.5in',
                        minHeight: '5.5in',
                    }}></div>
                </div>
                <div style={{
                    maxWidth: '0.5in',
                    minWidth: '0.5in',
                    maxHeight: '5.5in',
                    minHeight: '5.5in',
                }}></div>
            </Paper>
            <Paper
                ref={invoice2Ref}
                style={{
                    color: 'transparent',
                }}
                sx={{
                    maxWidth: '9in',
                    minWidth: '9in',
                    maxHeight: '5.5in',
                    minHeight: '5.5in',
                    display: 'none',

                }}
                elevation={0}
                square>
                <div style={{
                    maxWidth: '0.5in',
                    minWidth: '0.5in',
                    maxHeight: '5.5in',
                    minHeight: '5.5in',

                }}></div>
                <div style={{
                    maxWidth: '8in',
                    minWidth: '8in',
                    maxHeight: '5.5in',
                    minHeight: '5.5in',
                    borderRight: '1px solid transparent',
                    borderLeft: '1px solid transparent',
                    borderStyle: 'none dashed none dashed',
                    display: 'flex'
                }}>
                    <div style={{
                        maxWidth: '1in',
                        minWidth: '1in',
                        maxHeight: '5.5in',
                        minHeight: '5.5in',
                    }}></div>
                    <div style={{
                        maxWidth: '6in',
                        minWidth: '6in',
                        maxHeight: '5.5in',
                        minHeight: '5.5in',
                    }}>
                        <div style={{
                            maxWidth: '6in',
                            minWidth: '6in',
                            maxHeight: '1.4in',
                            minHeight: '1.4in',
                            display: 'flex'
                        }}>

                            <div style={{
                                maxWidth: '0.8in',
                                minWidth: '0.8in',
                                maxHeight: '1.4in',
                                minHeight: '1.4in',
                            }}>
                                <div style={{
                                    maxWidth: '0.8in',
                                    minWidth: '0.8in',
                                    maxHeight: '0.3in',
                                    minHeight: '0.3in',
                                }}></div>
                                <div style={{
                                    maxWidth: '0.8in',
                                    minWidth: '0.8in',
                                    maxHeight: '1.2in',
                                    minHeight: '1.2in',
                                }}>
                                    <img src={LOGO} style={{
                                        width: 60,
                                        display: 'none'
                                    }} />
                                </div>
                            </div>
                            <div style={{
                                maxWidth: '3.2in',
                                minWidth: '3.2in',
                                maxHeight: '1.4in',
                                minHeight: '1.4in',
                            }}>
                                <div style={{
                                    maxWidth: '3.2in',
                                    minWidth: '3.2in',
                                    maxHeight: '0.3in',
                                    minHeight: '0.3in',
                                }}></div>
                                <div style={{
                                    maxWidth: '3.2in',
                                    minWidth: '3.2in',
                                    maxHeight: '1.2in',
                                    minHeight: '1.2in',
                                }}>
                                    <div>
                                        <div id="title-header">{"GRAPE APARTMENT"}</div>
                                        <div style={{
                                            fontSize: 13
                                        }}>
                                            <div>2677/27-28 ซอยตรงข้ามโรงไม้ขีด, แขวงบางคอแหลม</div>
                                            <div>เขตบางคอแหลม กทม 10120</div>
                                            <div>โทร : 0-2291-3856, 0-2291-3858, 0-2291-3859</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div style={{
                                maxWidth: '2in',
                                minWidth: '2in',
                                maxHeight: '1.4in',
                                minHeight: '1.4in',
                            }}>
                                <div style={{
                                    maxWidth: '2in',
                                    minWidth: '2in',
                                    maxHeight: '0.3in',
                                    minHeight: '0.3in',
                                }}></div>
                                <div style={{
                                    maxWidth: '2in',
                                    minWidth: '2in',
                                    maxHeight: '1.2in',
                                    minHeight: '1.2in',
                                }}>
                                    {props.mode === "receipt" && (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'end',
                                        }}>
                                            <table style={{
                                                border: '1px solid'
                                            }}>
                                                <tr>
                                                    <th style={{
                                                        border: '1px solid',
                                                        padding: 10
                                                    }}>{"ใบเสร็จรับเงิน"}</th>
                                                </tr>
                                            </table>

                                        </div>
                                    )}
                                    {props.mode === "copy-receipt" && (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'end',
                                        }}>
                                            <table style={{
                                                border: '1px solid'
                                            }}>
                                                <tr>
                                                    <th style={{
                                                        border: '1px solid',
                                                        padding: 10
                                                    }}>{"สำเนาใบเสร็จรับเงิน"}</th>
                                                </tr>
                                            </table>

                                        </div>
                                    )}
                                    {props.mode === "invoice" && (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'end',
                                        }}>
                                            <table style={{
                                                border: '1px solid'
                                            }}>
                                                <tr>
                                                    <th style={{
                                                        border: '1px solid',
                                                        padding: 10
                                                    }}>{"ใบแจ้งหนี้"}</th>
                                                </tr>
                                            </table>

                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                        <div style={{
                            maxWidth: '6in',
                            minWidth: '6in',
                            maxHeight: '4.1in',
                            minHeight: '4.1in',
                        }}>
                            <div style={{
                                maxWidth: '6in',
                                minWidth: '6in',
                                maxHeight: '0.4in',
                                minHeight: '0.4in',
                                display: 'flex'
                            }}>
                                <div style={{
                                    maxWidth: '3.5in',
                                    minWidth: '3.5in',
                                    maxHeight: '0.4in',
                                    minHeight: '0.4in',
                                    display: 'flex',
                                    alignItems: 'baseline'
                                }}>
                                    <span style={{
                                        fontWeight: 'bold',
                                    }}>ได้รับเงินจากห้องหมายเลข :</span>
                                    <div style={{
                                        width: '1.2in',
                                        borderBottom: '1px solid',
                                        marginLeft: 5,
                                    }}>
                                        <InputBase style={{
                                            textAlign: 'center',
                                            height: '100%'
                                        }}
                                            value={data.room}
                                            onChange={(event) => {
                                                setData({ ...data, room: event.target.value })
                                            }}
                                        ></InputBase>
                                    </div>
                                </div>
                                <div style={{
                                    maxWidth: '2.5in',
                                    minWidth: '2.5in',
                                    maxHeight: '0.4in',
                                    minHeight: '0.4in',
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    justifyContent: 'end'
                                }}>
                                    <span style={{
                                        fontWeight: 'bold',
                                    }}>เดือน :</span>
                                    <div style={{
                                        width: '1.5in',
                                        borderBottom: '1px solid',
                                        marginLeft: 5,
                                    }}>
                                        <InputBase style={{
                                            textAlign: 'center',
                                            height: '100%'
                                        }}
                                            value={data.date}
                                            onChange={(event) => {
                                                setData({ ...data, date: event.target.value })
                                            }}
                                        ></InputBase>
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                maxWidth: '6in',
                                minWidth: '6in',
                                maxHeight: '3.7in',
                                minHeight: '3.7in',
                            }}>
                                <table style={{
                                    maxWidth: '6in',
                                    minWidth: '6in',
                                    border: '1px solid transparent',
                                    maxHeight: '2.7in',
                                    minHeight: '2.7in',
                                    display: 'contents'
                                }} >

                                    <tbody>
                                        <table style={{
                                            border: '1px solid transparent',
                                            borderCollapse: 'collapse',
                                            color: 'transparent'
                                        }} >
                                            <tr style={{
                                                background: 'transparent'
                                            }}>
                                                <th style={{
                                                    width: '0.69in',
                                                    height: '0.4in',
                                                    border: '1px solid transparent'
                                                }}>{"ลำดับที่"}</th>
                                                <th style={{
                                                    width: '3.87in',
                                                    height: '0.4in',
                                                    border: '1px solid transparent'
                                                }}>{"รายการ"}</th>
                                                <th style={{
                                                    width: '1.3in',
                                                    height: '0.4in',
                                                    border: '1px solid transparent'
                                                }}>{"จำนวนเงิน"}</th>
                                            </tr>
                                        </table>
                                    </tbody>
                                    <tbody>
                                        <table style={{
                                            border: '1px solid transparent',
                                            borderCollapse: 'collapse',
                                            color: 'transparent'
                                        }} >
                                            {data.table.map((val, key) => (
                                                <tr key={key}>
                                                    {key === 0 && (<React.Fragment>
                                                        <td style={{
                                                            maxWidth: '0.7in',
                                                            minWidth: '0.69in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            fontWeight: 'bold',
                                                        }}>{val.no}</td>
                                                        <td style={{
                                                            maxWidth: '3.9in',
                                                            minWidth: '3.87in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent'
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'baseline',
                                                            }}>
                                                                <div style={{
                                                                    width: '0.8in',
                                                                    fontSize: 14
                                                                }}>{val.description.name}</div>
                                                                <div
                                                                    style={{
                                                                        fontSize: 10
                                                                    }}>{"(รวมค่าบริการแล้ว)"}</div>
                                                            </div>
                                                        </td>
                                                        <td style={{
                                                            width: '1.3in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent'
                                                        }}>
                                                            <InputBase style={{
                                                                textAlign: 'center',
                                                                height: '100%'
                                                            }}
                                                                value={amount(val.amount)}
                                                                onChange={(event) => {
                                                                    const newTable = data.table.map((v, k) => {
                                                                        if (v.no === val.no) {
                                                                            return { ...v, amount: event.target.value }
                                                                        }

                                                                        return v
                                                                    })

                                                                    setData({ ...data, table: newTable })
                                                                }}
                                                            ></InputBase>
                                                        </td>
                                                    </React.Fragment>)}
                                                    {key === 1 && (<React.Fragment>
                                                        <td style={{
                                                            maxWidth: '0.7in',
                                                            minWidth: '0.69in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            fontWeight: 'bold',
                                                        }}>{val.no}</td>
                                                        <td style={{
                                                            maxWidth: '3.9in',
                                                            minWidth: '3.87in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent'
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'baseline',
                                                            }}>
                                                                <div style={{
                                                                    width: '0.8in',
                                                                    fontSize: 14
                                                                }}>{val.description.name}</div>
                                                                <div
                                                                    style={{
                                                                        fontSize: 10,
                                                                        display: 'flex'
                                                                    }}>
                                                                    <div>{"(จดมิเตอร์ครั้งแรก)"}</div>
                                                                    <div style={{
                                                                        width: '0.7in',
                                                                        borderBottom: '1px solid'
                                                                    }}>
                                                                        <InputBase style={{
                                                                            textAlign: 'center',
                                                                            height: '100%'
                                                                        }}
                                                                            value={val.description.unitBefor}
                                                                            onChange={(event) => {

                                                                                const newTable = data.table.map((v, k) => {
                                                                                    if (v.no === val.no) {
                                                                                        return { ...v, description: { ...v.description, unitBefor: event.target.value } }
                                                                                    }

                                                                                    return v
                                                                                })

                                                                                setData({ ...data, table: newTable })
                                                                            }}
                                                                        ></InputBase>
                                                                    </div>
                                                                    <div>{"(จดครั้งหลัง)"}</div>
                                                                    <div style={{
                                                                        width: '0.7in',
                                                                        borderBottom: '1px solid'
                                                                    }}>
                                                                        <InputBase style={{
                                                                            textAlign: 'center',
                                                                            height: '100%'
                                                                        }}
                                                                            value={val.description.unitAffter}
                                                                            onChange={(event) => {
                                                                                const newTable = data.table.map((v, k) => {
                                                                                    if (v.no === val.no) {
                                                                                        return { ...v, description: { ...v.description, unitAffter: event.target.value } }
                                                                                    }

                                                                                    return v
                                                                                })

                                                                                setData({ ...data, table: newTable })
                                                                            }}
                                                                        ></InputBase>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td style={{
                                                            maxWidth: '1.2in',
                                                            minWidth: '1.19in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent'
                                                        }}><InputBase style={{
                                                            textAlign: 'center',
                                                            height: '100%'
                                                        }}
                                                            value={amount(val.amount)}
                                                            onChange={(event) => {
                                                                const newTable = data.table.map((v, k) => {
                                                                    if (v.no === val.no) {
                                                                        return { ...v, amount: event.target.value }
                                                                    }

                                                                    return v
                                                                })

                                                                setData({ ...data, table: newTable })
                                                            }}
                                                        ></InputBase></td>
                                                    </React.Fragment>)}
                                                    {key === 2 && (<React.Fragment>
                                                        <td style={{
                                                            maxWidth: '0.7in',
                                                            minWidth: '0.69in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            fontWeight: 'bold',
                                                        }}>{val.no}</td>
                                                        <td style={{
                                                            maxWidth: '3.9in',
                                                            minWidth: '3.87in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent'
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'baseline',
                                                            }}>
                                                                <div style={{
                                                                    width: '0.8in',
                                                                    fontSize: 14
                                                                }}>{val.description.name}</div>
                                                                <div
                                                                    style={{
                                                                        fontSize: 10,
                                                                        display: 'flex'
                                                                    }}>
                                                                    <div>{"(จดมิเตอร์ครั้งแรก)"}</div>
                                                                    <div style={{
                                                                        width: '0.7in',
                                                                        borderBottom: '1px solid'
                                                                    }}>
                                                                        <InputBase style={{
                                                                            textAlign: 'center',
                                                                            height: '100%'
                                                                        }}
                                                                            value={val.description.unitBefor}
                                                                            onChange={(event) => {

                                                                                const newTable = data.table.map((v, k) => {
                                                                                    if (v.no === val.no) {
                                                                                        return { ...v, description: { ...v.description, unitBefor: event.target.value } }
                                                                                    }

                                                                                    return v
                                                                                })

                                                                                setData({ ...data, table: newTable })
                                                                            }}
                                                                        ></InputBase>
                                                                    </div>
                                                                    <div>{"(จดครั้งหลัง)"}</div>
                                                                    <div style={{
                                                                        width: '0.7in',
                                                                        borderBottom: '1px solid'
                                                                    }}>
                                                                        <InputBase style={{
                                                                            textAlign: 'center',
                                                                            height: '100%'
                                                                        }}
                                                                            value={val.description.unitAffter}
                                                                            onChange={(event) => {
                                                                                const newTable = data.table.map((v, k) => {
                                                                                    if (v.no === val.no) {
                                                                                        return { ...v, description: { ...v.description, unitAffter: event.target.value } }
                                                                                    }

                                                                                    return v
                                                                                })

                                                                                setData({ ...data, table: newTable })
                                                                            }}
                                                                        ></InputBase>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td style={{
                                                            maxWidth: '1.2in',
                                                            minWidth: '1.19in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent'
                                                        }}><InputBase style={{
                                                            textAlign: 'center',
                                                            height: '100%'
                                                        }}
                                                            value={amount(val.amount)}
                                                            onChange={(event) => {
                                                                const newTable = data.table.map((v, k) => {
                                                                    if (v.no === val.no) {
                                                                        return { ...v, amount: event.target.value }
                                                                    }

                                                                    return v
                                                                })

                                                                setData({ ...data, table: newTable })
                                                            }}
                                                        ></InputBase></td>
                                                    </React.Fragment>)}
                                                    {key === 3 && (<React.Fragment>
                                                        <td style={{
                                                            maxWidth: '0.7in',
                                                            minWidth: '0.69in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            fontWeight: 'bold',
                                                        }}>{val.no}</td>
                                                        <td style={{
                                                            maxWidth: '3.9in',
                                                            minWidth: '3.87in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent'
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'baseline',
                                                            }}>
                                                                <div style={{
                                                                    width: '0.8in',
                                                                    fontSize: 14
                                                                }}>{val.description.name}</div>

                                                            </div>
                                                        </td>
                                                        <td style={{
                                                            width: '1.3in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent'
                                                        }}>
                                                            <InputBase style={{
                                                                textAlign: 'center',
                                                                height: '100%'
                                                            }}
                                                                value={amount(val.amount)}
                                                                onChange={(event) => {
                                                                    const newTable = data.table.map((v, k) => {
                                                                        if (v.no === val.no) {
                                                                            return { ...v, amount: event.target.value }
                                                                        }

                                                                        return v
                                                                    })

                                                                    setData({ ...data, table: newTable })
                                                                }}
                                                            ></InputBase>
                                                        </td>
                                                    </React.Fragment>)}
                                                    {key === 4 && (<React.Fragment>
                                                        <td style={{
                                                            maxWidth: '0.7in',
                                                            minWidth: '0.69in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            fontWeight: 'bold',
                                                        }}>{val.no}</td>
                                                        <td style={{
                                                            maxWidth: '3.9in',
                                                            minWidth: '3.87in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent'
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'baseline',
                                                            }}>
                                                                <div style={{
                                                                    width: '0.8in',
                                                                    fontSize: 14
                                                                }}>{val.description.name}</div>

                                                            </div>
                                                        </td>
                                                        <td style={{
                                                            width: '1.3in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent'
                                                        }}>
                                                            <InputBase style={{
                                                                textAlign: 'center',
                                                                height: '100%'
                                                            }}
                                                                value={amount(val.amount)}
                                                                onChange={(event) => {
                                                                    const newTable = data.table.map((v, k) => {
                                                                        if (v.no === val.no) {
                                                                            return { ...v, amount: event.target.value }
                                                                        }

                                                                        return v
                                                                    })

                                                                    setData({ ...data, table: newTable })
                                                                }}
                                                            ></InputBase>
                                                        </td>
                                                    </React.Fragment>)}
                                                    {key === 5 && (<React.Fragment>
                                                        <td style={{
                                                            maxWidth: '0.7in',
                                                            minWidth: '0.69in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            fontWeight: 'bold',
                                                        }}>{val.no}</td>
                                                        <td style={{
                                                            maxWidth: '3.9in',
                                                            minWidth: '3.87in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent'
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'baseline',
                                                            }}>
                                                                <div style={{
                                                                    width: '0.8in',
                                                                    fontSize: 14
                                                                }}>{val.description.name}</div>

                                                            </div>
                                                        </td>
                                                        <td style={{
                                                            width: '1.3in',
                                                            height: '0.3in',
                                                            border: '1px solid transparent'
                                                        }}>
                                                            {val.amount}
                                                        </td>
                                                    </React.Fragment>)}
                                                </tr>
                                            ))}


                                        </table>
                                    </tbody>
                                    <tfoot>
                                        <table style={{
                                            border: '1px solid transparent',
                                            borderCollapse: 'collapse',
                                            color: 'transparent'
                                        }} >
                                            <tr>
                                                <td style={{
                                                    maxWidth: '3.6in',
                                                    minWidth: '3.57in',
                                                    height: '0.3in',
                                                    border: '1px solid transparent'
                                                }}>{""}</td>
                                                <td style={{
                                                    maxWidth: '1in',
                                                    minWidth: '0.99in',
                                                    height: '0.3in',
                                                    border: '1px solid transparent',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',

                                                }}>{"รวมทั้งสิ้น"}</td>
                                                <td style={{
                                                    maxWidth: '1.3in',
                                                    minWidth: '1.29in',
                                                    height: '0.3in',
                                                    border: '1px solid transparent'
                                                }}>
                                                    <InputBase style={{
                                                        textAlign: 'center',
                                                        height: '100%'
                                                    }}
                                                        value={total(data.table)}
                                                        onChange={(event) => {
                                                            setData({ ...data, total: event.target.value })
                                                        }}
                                                    ></InputBase>
                                                </td>
                                            </tr>
                                        </table>
                                    </tfoot>
                                </table>
                                <div style={{
                                    maxWidth: '6in',
                                    minWidth: '6in',
                                    maxHeight: '0.8in',
                                    minHeight: '0.8in',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <div style={{
                                        maxWidth: '2in',
                                        minWidth: '2in',
                                        maxHeight: '0.8in',
                                        minHeight: '0.8in',
                                        display: 'grid',
                                        alignItems: 'normal',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}>
                                        <div style={{
                                            width: '1.5in',
                                            height: '0.4in',
                                            borderBottom: '1px solid'
                                        }}></div>
                                        <div>
                                            {"ผู้รับเงิน"}
                                        </div>
                                    </div>
                                    <div style={{
                                        maxWidth: '2in',
                                        minWidth: '2in',
                                        maxHeight: '0.8in',
                                        minHeight: '0.8in',
                                        display: 'grid',
                                        alignItems: 'normal',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}>
                                        <div style={{
                                            width: '1.5in',
                                            height: '0.4in',
                                            borderBottom: '1px solid',
                                            display: 'flex',
                                            alignItems: 'end',
                                        }}>
                                            <InputBase style={{
                                                textAlign: 'center',
                                                // height: '100%'
                                            }}></InputBase>
                                        </div>
                                        <div>
                                            {"วันที่"}
                                        </div>
                                    </div>
                                    <div style={{
                                        maxWidth: '2in',
                                        minWidth: '2in',
                                        maxHeight: '0.8in',
                                        minHeight: '0.8in',
                                        display: 'grid',
                                        alignItems: 'normal',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        maxWidth: '1in',
                        minWidth: '1in',
                        maxHeight: '5.5in',
                        minHeight: '5.5in',
                    }}></div>
                </div>
                <div style={{
                    maxWidth: '0.5in',
                    minWidth: '0.5in',
                    maxHeight: '5.5in',
                    minHeight: '5.5in',
                }}></div>
            </Paper>
            {props.mode === "view" && (
                <MenuExportDoc invoice2Ref={invoice2Ref} invoiceRef={invoiceRef} name={props.mode} no={props.room}></MenuExportDoc>
            )}
            {props.mode === "created" && (
                <ButtonSave onClick={() => {
                    console.log(data);
                    window.api.invoice.create({ body: { ...data, total: total(data.table) } }).then((invoice) => {
                        if (invoice) {
                            setData({
                                id: randomId(),
                                date: "",
                                table: [
                                    {
                                        no: "1",
                                        description: {
                                            name: "ค่าเช่าห้อง",
                                            unitBefor: "",
                                            unitAffter: "",
                                        },
                                        amount: ""
                                    },
                                    {
                                        no: "2",
                                        description: {
                                            name: "ค่าไฟฟ้า",
                                            unitBefor: "",
                                            unitAffter: "",
                                        },
                                        amount: ""
                                    },
                                    {
                                        no: "3",
                                        description: {
                                            name: "ค่าน้ำประปา",
                                            unitBefor: "",
                                            unitAffter: "",
                                        },
                                        amount: ""
                                    },
                                    {
                                        no: "4",
                                        description: {
                                            name: "ค่าโทรศัพท์",
                                            unitBefor: "",
                                            unitAffter: "",
                                        },
                                        amount: ""
                                    },
                                    {
                                        no: "5",
                                        description: {
                                            name: "อื่นๆ",
                                            unitBefor: "",
                                            unitAffter: "",
                                        },
                                        amount: ""
                                    },
                                    {
                                        no: "",
                                        description: {
                                            name: "",
                                            unitBefor: "",
                                            unitAffter: "",
                                        },
                                        amount: ""
                                    }
                                ],
                                room: props.room,
                                total: ""
                            })
                            props.onClose()
                            window.location.reload()
                        }
                    })

                }}></ButtonSave>
            )}
            {props.mode === "updated" && (
                <ButtonSave onClick={() => {
                    console.log(data);
                    window.api.invoice.update({
                        body: { ...data, total: total(data.table) }, options: {
                            where: {
                                id: props.row.id
                            }
                        }
                    }).then((invoice) => {
                        if (invoice) {
                            setData({
                                id: randomId(),
                                date: "",
                                table: [
                                    {
                                        no: "1",
                                        description: {
                                            name: "ค่าเช่าห้อง",
                                            unitBefor: "",
                                            unitAffter: "",
                                        },
                                        amount: ""
                                    },
                                    {
                                        no: "2",
                                        description: {
                                            name: "ค่าไฟฟ้า",
                                            unitBefor: "",
                                            unitAffter: "",
                                        },
                                        amount: ""
                                    },
                                    {
                                        no: "3",
                                        description: {
                                            name: "ค่าน้ำประปา",
                                            unitBefor: "",
                                            unitAffter: "",
                                        },
                                        amount: ""
                                    },
                                    {
                                        no: "4",
                                        description: {
                                            name: "ค่าโทรศัพท์",
                                            unitBefor: "",
                                            unitAffter: "",
                                        },
                                        amount: ""
                                    },
                                    {
                                        no: "5",
                                        description: {
                                            name: "อื่นๆ",
                                            unitBefor: "",
                                            unitAffter: "",
                                        },
                                        amount: ""
                                    },
                                    {
                                        no: "",
                                        description: {
                                            name: "",
                                            unitBefor: "",
                                            unitAffter: "",
                                        },
                                        amount: ""
                                    }
                                ],
                                room: props.room,
                                total: ""
                            })
                            props.onClose()
                            window.location.reload()
                        }
                    })

                }}></ButtonSave>
            )}
        </React.Fragment>)
}