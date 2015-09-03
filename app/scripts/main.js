$(document).ready(function () {

    //Login Template Tweenlite Script
    $(document).mousemove(function (event) {
        TweenLite.to($("body"),
            0.5, {
                css: {
                    backgroundPosition: "" + parseInt(event.pageX / 8) + "px " +
                        parseInt(event.pageY / '12') + "px, " +
                        parseInt(event.pageX / '15') + "px " +
                        parseInt(event.pageY / '15') + "px, " +
                        parseInt(event.pageX / '30') + "px " +
                        parseInt(event.pageY / '30') + "px",
                    "background-position": parseInt(event.pageX / 8) + "px " +
                        parseInt(event.pageY / 12) + "px, " +
                        parseInt(event.pageX / 15) + "px " +
                        parseInt(event.pageY / 15) + "px, " +
                        parseInt(event.pageX / 30) + "px " +
                        parseInt(event.pageY / 30) + "px"
                }
            });
    });

    //Firebase Login - Password Provider
    var ref = new Firebase("https://angarsertruchat.firebaseio.com");

    $("#form-signin").validator({
        delay: 250,
        disable: false,
        feedback: {
            success: 'glyphicon-ok',
            error: 'glyphicon-remove'
        }
    }).on("submit", function (e) {
        if (e.isDefaultPrevented()) {
            console.log("Not working!!");
        } else {
            console.log("Hello!");
            var username = $("#email").val();
            var password = $("#password").val();
            console.log(username, password);
            !isAuth() ? logIn(username, password) : console.log("You are already authenticated");
            e.preventDefault();
        }
    });

    //manejar cuando los campos estén vacios

    function logIn(username, password) {
        ref.authWithPassword({
            email: username,
            password: password
        }, function (error, authData) {
            if (error) {
                if (error.code === "INVALID_USER") { //The specified user account does not exist.
                    createUser(username, password);
                } else if (error.code === "INVALID_EMAIL") { //The specified email is not a valid email.
                    console.log(error.code.toLowerCase());
                } else if (error.code === "INVALID_PASSWORD") { //The specified user account password is incorrect
                    console.log(error.code.toLowerCase());
                }
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
                console.log("An error has ocurred", error.code);
            } else {
                logIn(username, password);
                console.log(userData);
            }
        });
    }

    function isAuth() {
        var isAuth;
        ref.onAuth(function (authData) {
            isAuth = authData ? true : false;
        });
        return isAuth;
    }
    // Create a callback which logs the current auth state
    //function authDataCallback(authData) {
    //    if (authData) {
    //        console.log("User " + authData.uid + " is logged in with " + authData.provider);
    //    } else {
    //        console.log("User is logged out");
    //    }
    //}

    // Register the callback to be fired every time auth state changes
    //var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
    //ref.onAuth(authDataCallback);

    //ref.offAuth(authDataCallback); //stop watching
});