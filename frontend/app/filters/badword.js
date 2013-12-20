Chat.App.filter('badword', function () {
    return function (text) {
        Chat.Config.badwords.forEach(function(word) {
            text = text.replace(word, '*****');
        });
        return text;
    };
});