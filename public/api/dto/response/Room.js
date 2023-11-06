class RoomResponseDto {
    id;
    name;
    constructor(payload) {
        this.id = payload.id && payload.id;
        this.name = payload.name && payload.name;
    }
}



module.exports = RoomResponseDto