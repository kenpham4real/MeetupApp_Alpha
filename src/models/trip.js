export class Trip {
    constructor(id, ownerId,name, startDate, endDate, locations){
        this.id = id,
        this.ownerId = ownerId;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.locations = locations;
    }
}