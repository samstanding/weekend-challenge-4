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










}]);//end app Controller