const app = angular.module('myApp', []);

const appController = app.controller('AppController', ['$http', function ($http) {
let self = this;
console.log('what up!');

self.photoArray = [];



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









}]);//end app Controller