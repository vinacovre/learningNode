// the logger.js will be called for each request and before any of our routes

// We assign our logger function to module.exports in order to export it as a Node module and make it accessible from other files
module.exports = function (request, response, next) {
    var start = +new Date();
    var stream = process.stdout;
    var url = request.url;
    // var url = request.location.pathname;
    var method = request.method;

    response.on('finish', function () {
        var duration = +new Date() - start;
        var message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n';
        stream.write(message);
    });

    next();
}