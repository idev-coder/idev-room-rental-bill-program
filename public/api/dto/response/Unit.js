class UnitResponseDto {
    id;
    eUnit;
    wUnit;
    constructor(payload) {
        this.id = payload.id && payload.id;
        this.eUnit = payload.eUnit && payload.eUnit;
        this.wUnit = payload.wUnit && payload.wUnit;
    }
}



module.exports = UnitResponseDto