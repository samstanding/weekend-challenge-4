const app = angular.module('myApp', []);

const appController = app.controller('AppController', ['$http', function ($http) {
let self = this;
console.log('what up!');


self.photoArray = [];
self.newComment = {};
self.commentArray = [];
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
        self.getPhotos();
        self.newComment = {};
    }).catch(function (error) {
        console.log(`error on post comment: ${error}`);
    })    
}

self.getComments = function (id) {
    $http({
        method: 'GET',
        url:`/gallery/${id}`
    }).then(function (response) {
        self.commentArray = response.data.rows;
        console.log(response.data.rows);
        
    }).catch(function (error) {
        console.log(`error on comment get: ${error}`);
    })
}

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