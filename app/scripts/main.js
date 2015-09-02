$(document).ready(function () {

    //Login Template Tweenlite Script
    $(document).mousemove(function (event) {
        TweenLite.to($("body"),
            .5, {
                css: {
                    backgroundPosition: "" + parseInt(event.pageX / 8) + "px " + parseInt(event.pageY / '12') + "px, " + parseInt(event.pageX / '15') + "px " + parseInt(event.pageY / '15') + "px, " + parseInt(event.pageX / '30') + "px " + parseInt(event.pageY / '30') + "px",
                    "background-position": parseInt(event.pageX / 8) + "px " + parseInt(event.pageY / 12) + "px, " + parseInt(event.pageX / 15) + "px " + parseInt(event.pageY / 15) + "px, " + parseInt(event.pageX / 30) + "px " + parseInt(event.pageY / 30) + "px"
                }
            });
    });

    //Firebase Login - Password Provider
    var ref = new Firebase("https://angarsertruchat.firebaseio.com");

    $("#login").on("click", function (e) {
        var username = $("#username").val();
        var password = $("#password").val();
        logIn(username, password);
        e.preventDefault();
    });

    function logIn(username, password) {
        ref.authWithPassword({
            email: username,
            password: password
        }, function (error, authData) {
            if (error) {
                createUser(username, password);
            } else {
                console.log("Authenticated successfully with payload:", authData);
            }
        });
    }

    function createUser(username, password) {
        ref.createUser({
            email: username,
            password: password
        }, function (error, userData) {
            if (error) {
                console.log("An error has ocurred", error.message);
            } else {
                logIn(username, password);
            }
        });
    }
});