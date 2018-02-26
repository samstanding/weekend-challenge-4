const app = angular.module('myApp', []);

const appController = app.controller('AppController', ['$http', function ($http) {
let self = this;

self.photoArray = [];
self.newComment = {commentName: '', commentContent: ''};
self.commentArray = [];
self.clickComments = [];
self.newPhoto={};


self.getPhotos = function () {
    $http ({
        method:'GET',
        url: '/gallery'
    }).then (function (response) {
        self.photoArray= response.data.rows;
        console.log(self.photoArray);
    }).catch(function (error) {
        console.log(error, 'on get');
    })
}

self.getPhotos();

self.addLike = function (id) {
    $http ({
        method:'PUT',
        url: `/gallery/${id}`
    }).then(function (response) {
        self.getPhotos();
    }).catch(function (error) {
        console.log('error on put: ', error );        
    })
}

self.addCount = function (id) {
    $http ({
        method:'PUT',
        url: `/gallery/count/${id}`
    }).then(function (response) {
        console.log('adding clicks');
    }).catch(function (error) {
        console.log('error on put: ', error );        
    })
}

self.addComment = function (newComment, id) {
    $http({
        method:'POST',
        url: `/gallery/${id}`,
        data: newComment
    }).then(function (response) {
        self.newComment = {};
        self.getPhotos();
    }).catch(function (error) {
        console.log(`error on post comment: ${error}`);
    })    
}

self.getComments = function () {
    $http({
        method: 'GET',
        url:`/gallery/comments`
    }).then(function (response) {
        self.commentArray = response.data.rows;
        console.log(self.commentArray);
    }).catch(function (error) {
        console.log(`error on comment get: ${error}`);
    })
}

// self.commentSort = function (id, array) {
//     self.clickComments = [];
//     for (obj of array) {
//         console.log(obj);
//         if (id == obj.photo_id) {
//             self.clickComments.push(obj); 
//     }
// }
// }

self.addPhoto = function (photo) {
    console.log(photo);
    
    $http({
        method:'POST',
        url: '/gallery',
        data: photo
    }).then(function (response) {
        self.newPhoto = {};
        self.getPhotos();
    }).catch(function(error) {
        console.log('post error: ',error);
        
    })
}







}]);//end app Controller