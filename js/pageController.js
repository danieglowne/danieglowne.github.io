var app = angular.module('myApp', ['ngRoute', 'ngAnimate']);

// configure our routes
app.config(function($routeProvider) {
    $routeProvider

    // route for the main page
        .when('/main', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })


    // route for the contact page
    .when('/contact', {
        templateUrl: 'pages/contact.html',
        controller: 'contactController'
    })

    // route for the main page
    .otherwise({
        redirectTo: '/main'
    });
});


app.controller('mainController', function($scope) {

    $.getJSON("data/data.json", function(json) {
        quizes = json.data;
        for (var i = 0; i < quizes.length; i++) {
            quizes[i].state = 0;
            quizes[i].useranswer = null;
            quizes[i].answer = function(answer) {
                this.state = 1;
                this.useranswer = answer;
            };
        }
        $scope.data = quizes;
    }).fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });

});


app.directive('quiz', function() {
    return {
        restrict: 'AE', //attribute or element
        templateUrl: 'pages/quiz_template.html',
        replace: true,
        scope: {
            quizdata: '='
        },

    };
});