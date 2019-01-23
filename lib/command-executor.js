module.exports = function moduleDef() {
    const members = {};

    function handler(pipe, err, result) {
        if (err) {
            pipe.throw(err);
            return;
        }
        pipe.respond(result);
    }
    // touch
    members.touch = function touch(pipe, connection, params) {
        connection.touch(params.key, params.lifetime, (err, result) => handler(pipe, err, result));
    };
    // get
    members.get = function get(pipe, connection, params) {
        connection.get(params.key, (err, result) => handler(pipe, err, result));
    };
    // gets
    members.gets = function gets(pipe, connection, params) {
        connection.gets(params.key, (err, result) => handler(pipe, err, result));
    };
    // getMulti
    members.getMulti = function getMulti(pipe, connection, params) {
        connection.getMulti(params.keys, (err, result) => handler(pipe, err, result));
    };
    // set
    members.set = function set(pipe, connection, params) {
        connection.set(params.key,
            params.value,
            params.lifetime,
            (err, result) => handler(pipe, err, result));
    };
    // replace
    members.replace = function replace(pipe, connection, params) {
        connection.replace(params.key,
            params.value,
            params.lifetime,
            (err, result) => handler(pipe, err, result));
    };

    // add
    members.add = function add(pipe, connection, params) {
        connection.add(params.key,
            params.value,
            params.lifetime,
            (err, result) => handler(pipe, err, result));
    };
    // cas
    members.cas = function cas(pipe, connection, params) {
        connection.cas(params.key,
            params.value,
            params.lifetime,
            params.cas,
            (err, result) => handler(pipe, err, result));
    };
    // append
    members.append = function append(pipe, connection, params) {
        connection.append(params.key,
            params.value,
            (err, result) => handler(pipe, err, result));
    };
    // prepend
    members.prepend = function prepend(pipe, connection, params) {
        connection.prepend(params.key,
            params.value,
            (err, result) => handler(pipe, err, result));
    };
    // incr
    members.incr = function incr(pipe, connection, params) {
        connection.incr(params.key,
            params.amount,
            (err, result) => handler(pipe, err, result));
    };
    // decr
    members.decr = function decr(pipe, connection, params) {
        connection.decr(params.key,
            params.amount,
            (err, result) => handler(pipe, err, result));
    };
    // del
    members.del = function del(pipe, connection, params) {
        connection.del(params.key,
            (err, result) => handler(pipe, err, result));
    };
    // version
    members.version = function version(pipe, connection) {
        connection.version((err, result) => handler(pipe, err, result));
    };
    // flush
    members.flush = function flush(pipe, connection) {
        connection.flush((err, result) => handler(pipe, err, result));
    };
    // stats
    members.stats = function stats(pipe, connection) {
        connection.stats((err, result) => handler(pipe, err, result));
    };
    // settings
    members.settings = function settings(pipe, connection) {
        connection.settings((err, result) => handler(pipe, err, result));
    };
    // slabs
    members.slabs = function slabs(pipe, connection) {
        connection.slabs((err, result) => handler(pipe, err, result));
    };
    // items
    members.items = function items(pipe, connection) {
        connection.items((err, result) => handler(pipe, err, result));
    };
    // end
    members.end = function end(pipe, connection) {
        connection.end((err, result) => handler(pipe, err, result));
    };
    return members;
};
