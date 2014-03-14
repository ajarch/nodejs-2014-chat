var Error = function Error(message, data) {
    this._data = this.setData(data);
};

Error.prototype.setData = function(data) {
    if(typeof data !== "object") {
        return false;
    } else {
        this._data = data;
    }
};

Error.prototype.getData = function() {
    return this._data;
};

module.exports = Error;