Chat.App.controller('ChatController', function($scope, Chat) {
    $scope.lines = Chat.getLines();
    $scope.send = Chat.send;
});