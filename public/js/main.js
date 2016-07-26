// catch simple errors

// declare splat-app namespace if it doesn't already exist
var fullstack =  fullstack || {};

// Define Backbone router
fullstack.AppRouter = Backbone.Router.extend({
    // Map "URL paths" to "router functions"
    routes: {
        "": "home",
        "*default": "home"
    },

    initialize: function() {
    },

    home: function() {
        // If the Home view doesn't exist, instantiate one
        if (!this.homeView) {
            this.homeView = new fullstack.Home();
        };
        // insert the rendered Home view element into the document DOM
        $('#content').html(this.homeView.render().el);
    },
})
