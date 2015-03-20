var User = require('../models/user');
var assert = require('assert');

User.prototype.setSocket = function(socket) {
    // NOOP
};

User.prototype.message = function(line) {
    // NOOP
};

User.prototype.backlog = function(backlog) {
    // NOOP
};

describe("User", function() {
   describe("when instantiated as Testuser", function() {
        var user;

      beforeEach(function() {
        user = new User("Testuser", {})
      });

       it("should have name Testuser", function() {
           assert.equal(user.getName(), 'Testuser');
       });

       it("should have new name after setting name", function() {
           user.setName('New Name');
           assert.equal(user.getName(), 'New Name');
       });

       it("should, by default, be in lobby", function() {
           assert.equal(user.getCurrentRoom().getName(), 'lobby');
       });

       it("should be in new_room after /join new_room", function() {
           user.handleCommandMessage('/join new_room');
           assert.equal(user.getCurrentRoom().getName(), 'new_room');
       });

       it("should be in lobby after /leave new_room", function() {
           user.handleCommandMessage('/join new_room');
           user.handleCommandMessage('/leave new_room');
           assert.notEqual(user.getCurrentRoom().getName(), 'new_room');
       });

       it("should be called NewUserName after /name NewUserName", function() {
           user.handleCommandMessage('/name NewUserName');
           assert.equal(user.getName(), 'NewUserName');
       });

       it("should not do anything after /bla test", function() {
           user.handleCommandMessage('/bla test');
           assert.equal(user.getName(), 'Testuser');
           assert.equal(user.getCurrentRoom().getName(), 'lobby');
       });
   });
});

describe("Room", function() {
    describe("when instantiated as Testuser", function() {
        var user;

        beforeEach(function() {
            user = new User("Testuser", {})
        });

        it("should have name Testuser", function() {
            assert.equal(user.getName(), 'Testuser');
        });

        it("should have new name after setting name", function() {
            user.setName('New Name');
            assert.equal(user.getName(), 'New Name');
        });

        it("should, by default, be in lobby", function() {
            assert.equal(user.getCurrentRoom().getName(), 'lobby');
        });

        it("should be in new_room after /join new_room", function() {
            user.handleCommandMessage('/join new_room');
            assert.equal(user.getCurrentRoom().getName(), 'new_room');
        });

        it("should be in lobby after /leave new_room", function() {
            user.handleCommandMessage('/join new_room');
            user.handleCommandMessage('/leave new_room');
            assert.notEqual(user.getCurrentRoom().getName(), 'new_room');
        });

        it("should be called NewUserName after /name NewUserName", function() {
            user.handleCommandMessage('/name NewUserName');
            assert.equal(user.getName(), 'NewUserName');
        });

        it("should not do anything after /bla test", function() {
            user.handleCommandMessage('/bla test');
            assert.equal(user.getName(), 'Testuser');
            assert.equal(user.getCurrentRoom().getName(), 'lobby');
        });
    });
});