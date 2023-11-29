const UnitRequestDto = require('../dto/request/Unit');
const db = require('../models')

const Unit = db['units']

exports.findAll = (options) => {
    if (options) {
        return Unit.findAll(options)
    } else {
        return Unit.findAll()
    }

};

exports.findByPk = (id) => {
    return Unit.findByPk(id)
};

exports.findOne = (options) => {
    return Unit.findOne(options)
};

exports.create = async (payload) => {
    const data = new UnitRequestDto(payload)

    const doc = await Unit.create(data)

    return Unit.findByPk(doc.id)
};

exports.update = async (payload, options) => {
    const data = new UnitRequestDto(payload)
console.log(data);
    await Unit.update(data, options)

    return Unit.findByPk(options.where.id)
};

exports.destroy = async (options) => {
    return Unit.destroy(options);
};