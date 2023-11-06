const InvoiceRequestDto = require('../dto/request/Invoice');
const db = require('../models')

const Invoice = db['invoices']

exports.findAll = (options) => {
    if (options) {
        console.log(options);
        return Invoice.findAll(options)
    } else {
        return Invoice.findAll()
    }

};

exports.findByPk = (id) => {
    return Invoice.findByPk(id)
};

exports.findOne = (options) => {
    return Invoice.findOne(options)
};

exports.create = async (payload) => {
    const data = new InvoiceRequestDto(payload)

    const doc = await Invoice.create(data)

    return Invoice.findByPk(doc.id)
};

exports.update = async (payload, options) => {
    const data = new InvoiceRequestDto(payload)

    await Invoice.update(data, options)

    return Invoice.findByPk(data.id)
};

exports.destroy = async (options) => {
    return Invoice.destroy(options);
};