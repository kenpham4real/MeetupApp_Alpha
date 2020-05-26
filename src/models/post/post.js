'use strict'

export class Post{
    constructor(postId, ownerId, postImage, date, description, checkin_location, likeInfo, commentInfo, shareInfo){
        this.postId = postId;
        this.ownerId = ownerId;
        this.postImage = postImage;
        this.date = date;
        this.description = description;
        this.checkin_location = checkin_location;
        this.likeInfo = likeInfo;
        this.commentInfo = commentInfo;
        this.shareInfo = shareInfo;
    }
}

