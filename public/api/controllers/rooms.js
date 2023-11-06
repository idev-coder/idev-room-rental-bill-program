const service = require('../service/rooms')
const RoomResponseDto = require('../dto/response/Room')

exports.findAll = async (options) => {
    const doc = await service.findAll(options);
    return doc.map((value) => new RoomResponseDto(value))
}

exports.findByPk = async (id) => {
    const doc = await service.findByPk(id);
    if (!doc) {
        return null
    } else {
        return new RoomResponseDto(doc)

    }
}

exports.findOne = async (options) => {
    const doc = await service.findOne(options);
    console.log(doc);
    return new RoomResponseDto(doc)
}

exports.create = async (body) => {
    const payload = body;
    const doc = await service.create(payload);
    return new RoomResponseDto(doc)

}

exports.update = async (body, options) => {
    const payload = body;

    const doc = await service.update(payload, options);

    return new RoomResponseDto(doc)
}

exports.destroy = async (options) => {


    return await service.destroy(options);
}