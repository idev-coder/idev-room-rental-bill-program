class InvoiceRequestDto {
    id;
    date;
    table;
    room;
    total;

    constructor(payload) {
        this.id = payload.id && payload.id;
        this.date = payload.date && payload.date;
        this.table = payload.table && JSON.stringify(payload.table);
        this.room = payload.room && payload.room;
        this.total = payload.total && payload.total;
    }
}



module.exports = InvoiceRequestDto