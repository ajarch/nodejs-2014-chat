Chat.App.controller('ChatController', function($scope, Chat) {
    $scope.lines = Chat.getLines();
    $scope.username = Chat.getUsername();
    $scope.send = Chat.send;
});