const RoomRequestDto = require('../dto/request/Room');
const db = require('../models')

const Room = db['rooms']

exports.findAll = (options) => {
    if (options) {
        return Room.findAll(options)
    } else {
        return Room.findAll()
    }

};

exports.findByPk = (id) => {
    return Room.findByPk(id)
};

exports.findOne = (options) => {
    return Room.findOne(options)
};

exports.create = async (payload) => {
    const data = new RoomRequestDto(payload)

    const doc = await Room.create(data)

    return Room.findByPk(doc.id)
};

exports.update = async (payload, options) => {
    const data = new RoomRequestDto(payload)

    await Room.update(data, options)

    return Room.findByPk(data.id)
};

exports.destroy = async (options) => {
    return Room.destroy(options);
};