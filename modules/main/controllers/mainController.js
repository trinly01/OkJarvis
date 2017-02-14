angular
.module('app')
.controller('mainController', mainController);

function mainController($scope, $rootScope, $timeout){
    
    var jarvis = new ElizaBot(true);
    
    $scope.volume = 'volume_off';
    $scope.volumeColor = '#3F51B5';
    $scope.speaking = false;
    
    function reset(){
        speak.pause();
        annyang.resume();
        speak = speak.noConflict();
        $scope.volume = 'volume_off';
        $scope.volumeColor = '#3F51B5';
        $scope.speaking = false;
    }
    
    var commands = {
        '*words': function(words) {
            console.log('USER:', words);
            annyang.pause();
            $timeout(function(){
                $scope.volume = 'volume_up';
                $scope.volumeColor = '#D32F2F';
                $scope.speaking = true;
                var reply = jarvis.transform(words); 
                speak.play(reply, {}, function(){
                    $timeout(reset);
                    reset();
                });
                console.log('JARVIS:', reply);
            });
        },
    };

    // Add our commands to annyan
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
}