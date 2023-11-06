const service = require('../service/invoices')
const InvoiceResponseDto = require('../dto/response/Invoice')

exports.findAll = async (options) => {
    const doc = await service.findAll(options);
    return doc.map((value) => new InvoiceResponseDto(value))
}

exports.findByPk = async (id) => {
    const doc = await service.findByPk(id);
    if (!doc) {
        return null
    } else {
        return new InvoiceResponseDto(doc)

    }
}

exports.findOne = async (options) => {
    const doc = await service.findOne(options);
    return  new InvoiceResponseDto(doc)
}

exports.create = async (body) => {
    const payload = body;
    const doc = await service.create(payload);
    return new InvoiceResponseDto(doc)

}

exports.update = async (body,options) => {
    const payload = body;

    const doc = await service.update(payload, options);

    return new InvoiceResponseDto(doc)
}

exports.destroy = async (options) => {
   

    return  await service.destroy(options);
}