/* jshint laxcomma: true, node: true */
"use strict";

exports.index = function(req, res){
    res.render('index');
};

exports.channel = function(req, res){
    res.sendfile(__dirname + "/public/channel.html")
}
