'use strict'

var app = angular.module ('MyApp',['ui.router']);

app.config([
    '$stateProvider',
    function ($stateProvider){
        $stateProvider
            .state('home',{
            url:'/',
            templateUrl:'/templates/home.html',
            controller:'MyApp.HomeController'
            })
            .state('about',{
            url:'/about',
            templateUrl:'/templates/about.html'
            })
            .state('contact',{
            url:'/contact',
            templateUrl:'/templates/contact.html'
            })
            .state('httpRequest',{
            url:'/httpRequest',
            templateUrl:'/templates/httpRequest.html',
            controller:'MyApp.HttpRequestController'
            })
    }
])

app.controller ('MyApp.HomeController',[
    '$scope',

    function($scope){
        console.log ('Home Controller is working')

        $scope.name= 'rob';
        $scope.age= 42;

        $scope.addListItem = function () {
            console.log ('Add List Item');
            $scope.nameList.push ('rob');
        }

        $scope.nameList = ['susan', 'jane', 'larry', 'jon snow', 'frank']

        $scope.increaseAge = function () {
            console.log('Increasing the age')
            $scope.age = $scope.age+1;
        }
    }
]);

app.controller ('MyApp.HttpRequestController',[
    '$scope', '$http',

    function($scope,$http){
        console.log ('Http Request Controller is working')

        $scope.post={};
        $scope.postList=[];

        $scope.create = function () {
            console.log('Trying to create a post: ', $scope.post);
            console.log ('Form state: ', $scope.createPost.$valid);

            // Make a call only if valid
            if ($scope.createPost.$valid){
                $http({
                    url:'http://localhost:3000/posts',

                    // use the 'POST' method because we want to post/create data on the server
                    method : 'POST',
                    data: $scope.post
                })
                .success (function(response){
                    console.log('This is the response: ',response)
                })
                .error (function(response){
                    console.log('This is the error: ',response)
                })
            }
        }

        $scope.readAll = function (){
            console.log (' Trying to read a post');

            // Make a call to grab all the posts objects
            $http({
                url: 'http://localhost:3000/posts',

                method:'GET'
                })

                .success (function(response){
                    console.log('This is a response',response)
                    $scope.postList=response;
                })
                .error (function(response){
                    console.log('This is a response', response)
                })
        }

        $scope.updatePost = function (){
            console.log (' Updating the post');

            // Make a call to update all the posts objects
            $http({
                url: 'http://localhost:3000/posts/' +$scope.post.id,

                method:'PUT',
                data:$scope.post
                })

                .success (function(response){
                    console.log('This is a response',response)
                    $scope.postList=response;
                })
                .error (function(response){
                    console.log('This is a response', response)
                })
        }

        $scope.deletePost = function (){
            console.log (' Deleting the post');

        $http({
            url: 'http://localhost:3000/posts/' +$scope.post.id,

            method:'DELETE',
            data:$scope.post
            })

            .success (function(response){
                console.log('This is a response',response)
                $scope.postList=response;
            })
            .error (function(response){
                console.log('This is a response', response)
            })
        }
    }
]);
