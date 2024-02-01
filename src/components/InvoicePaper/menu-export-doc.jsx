import * as React from 'react';

import {
    Box,
    Backdrop,
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction
} from '@idev/ui';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import '../../assets/fonts/Kanit/Kanit-Regular-normal';
import '../../assets/fonts/Kanit/Kanit-Italic-italic';
import '../../assets/fonts/Kanit/Kanit-BoldItalic-bolditalic';
import '../../assets/fonts/Kanit/Kanit-Bold-bold';

export default function MenuExportDoc(props) {
    const { windowControls } = window;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const screenShot = (element) => {
        html2canvas(element, {
            scale: 2

        }).then((canvas) => {
            const image = canvas.toDataURL('png');
            const a = document.createElement('a');
            a.setAttribute('download', `${props.name}-${props.no}.png`);
            a.setAttribute('href', image);
            a.click();
        });
    };

    const saveImage = (element) => {
        console.log(element);
        screenShot(element)
        handleClose()
    }

    const savePDF = (element) => {
        const doc = new jsPDF({
            orientation: 'l',
            unit: 'in',
            format: [5.5, 9]
        })
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        console.log(width);
        html2canvas(element).then((canvas) => {

            const image = canvas.toDataURL(
                'image/jpg');

            doc.addImage(image, 'JPEG', 0, 0, width, height);
            doc.save(`${props.name}-${props.no}.pdf`);
            // doc.html("<img id='Image' width='"+width+"px'  src=" + image + "></img>", {
            //     callback: function (doc) {
            //         // Save the PDF
            //         doc.setFont("Kanit", "normal")
            //         doc.setFont("Kanit", "italic")
            //         doc.setFont("Kanit", "bolditalic")
            //         doc.setFont("Kanit", "bold")
            //         doc.save(`${props.name}-${props.no}.pdf`);
            //     },
            //     x: 0,
            //     y: 0,
            //     width: width, //target width in the PDF document
            //     windowWidth: width//window width in CSS pixels
            // });

        });

        // doc.html(w, {
        //     callback: function (doc) {
        //         // Save the PDF
        //         doc.setFont("Kanit","normal")
        //         doc.setFont("Kanit","italic")
        //         doc.setFont("Kanit","bolditalic")
        //         doc.setFont("Kanit","bold")
        //         doc.save(`${props.name}-${props.no}.pdf`);
        //     },
        //     x: 0,
        //     y: 0,
        //     width: width, //target width in the PDF document
        //     windowWidth: width//window width in CSS pixels
        // });

        // handleClose()
    }
    const print = (element) => {
        const head = document.getElementsByTagName('head')[0]
        const w = window.open();
        w.document.write('<html>');
        w.document.write(head.outerHTML);
        w.document.write('<body>');
        w.document.write(element.outerHTML)
        w.document.write('</body></html>');
        setTimeout(() => {
            w.print();
            w.close();
        }, 1000)
        handleClose()
    }

    const printBill = (element) => {
        element.style.display = "flex"
        const head = document.getElementsByTagName('head')[0]
        const w = window.open();
        w.document.write('<html>');
        w.document.write(head.outerHTML);
        w.document.write('<body>');
        w.document.write(element.outerHTML)
        w.document.write('</body></html>');

        setTimeout(() => {
            w.print();
            w.close();
        }, 1000)
        element.style.display = "none"
        handleClose()
    }

    return (
        <Box sx={{
            position: 'fixed',
            bottom: '18px',
            right: '37px',
        }}>
            <SpeedDial
                ariaLabel="menu export doc tooltip"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                <SpeedDialAction
                    icon={<i className="fa-duotone fa-images"></i>}
                    tooltipTitle={<div style={{ width: 100 }}>{"บันทึกภาพ"}</div>}
                    tooltipOpen
                    onClick={() => saveImage(props.invoiceRef.current)}

                />
                <SpeedDialAction
                    icon={<i className="fa-duotone fa-file-pdf"></i>}
                    tooltipTitle={<div style={{ width: 100 }}>{"บันทึก pdf"}</div>}
                    tooltipOpen
                    onClick={() => savePDF(props.invoiceRef.current)}

                />
                <SpeedDialAction
                    icon={<i className="fa-duotone fa-print"></i>}
                    tooltipTitle={<div style={{ width: 100 }}>{"พิมพ์ฟร์อม"}</div>}
                    tooltipOpen
                    onClick={() => {
                        print(props.invoiceRef.current)
                    }}

                />
                <SpeedDialAction
                    icon={<i className="fa-duotone fa-print"></i>}
                    tooltipTitle={<div style={{ width: 100 }}>{"พิมพ์บิล"}</div>}
                    tooltipOpen
                    onClick={() => {
                        printBill(props.invoice2Ref.current)
                    }}

                />
            </SpeedDial>
        </Box>
    );
}