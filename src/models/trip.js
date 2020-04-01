export class Trip {
    constructor(name, ownerId, startDate, endDate, locations){
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.ownerId = ownerId;
        this.locations = locations;
    }
}