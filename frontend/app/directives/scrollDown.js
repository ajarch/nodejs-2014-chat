Chat.App.directive('scrollDown', function ()
{
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var $messages = $('.messages');

            function scrollDown() {
                $messages.scrollTop($messages[0].scrollHeight - $messages.height());
            }

            scope.$watch('lines', function(lines) {
                scrollDown();
            }, true);
        }
    };
});