const service = require('../service/units')
const UnitResponseDto = require('../dto/response/Unit')

exports.findAll = async (options) => {
    const doc = await service.findAll(options);
    return doc.map((value) => new UnitResponseDto(value))
}

exports.findByPk = async (id) => {
    const doc = await service.findByPk(id);
    if (!doc) {
        return null
    } else {
        return new UnitResponseDto(doc)

    }
}

exports.findOne = async (options) => {
    const doc = await service.findOne(options);
    //console.log(doc);
    return new UnitResponseDto(doc)
}

exports.create = async (body) => {
    const payload = body;
    const doc = await service.create(payload);
    return new UnitResponseDto(doc)

}

exports.update = async (body, options) => {
    const payload = body;

    const doc = await service.update(payload, options);

    return new UnitResponseDto(doc)
}

exports.destroy = async (options) => {


    return await service.destroy(options);
}