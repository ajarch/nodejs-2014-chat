Chat.App.directive('chatInput', function ()
{
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var $input = element.find('input');

            $input.on('keypress', function(e) {
                // 13 === Enter Key
                if(e.which !== 13) return true;
                // send message
                scope.send($(this).val());
                // clear the input field
                $(this).val('');
            });
        }
    };
});