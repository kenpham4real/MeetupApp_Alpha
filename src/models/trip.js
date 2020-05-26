'use strict'

export class Trip {
    constructor(id, ownerId,name, startDate, endDate, locations, locations_Image){
        this.id = id,
        this.ownerId = ownerId;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.locations = locations;
        this.locations_Image = locations_Image
    }
}

export class TripShare{
    constructor(uri){
        this.uri = uri;
    }
}