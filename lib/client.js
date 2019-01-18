const constants = require('./constants');
module.exports = function clientFactory(pipe) {
    const members = {};
    function request(method, params) {
        return new Promise((resolve, reject) => {
            pipe.create()
                .once('error', reject)
                .once('response', resolve)
                .request({
                    method,
                    params
                });
        });
    }
    // touch
    members.touch = function touch(key, lifetime) {
        return request(constants.TOUCH_OP, {key, lifetime});
    };
    // get
    members.get = function get(key) {
        return request(constants.GET_OP, {key});
    };
    // gets
    members.gets = function gets(key) {
        return request(constants.GETS_OP, {key});
    };
    // getMulti
    members.getMulti = function getMulti(keys) {
        return request(constants.GETMULTI_OP, {keys});
    };
    // set
    members.set = function set(key, value, lifetime) {
        return request(constants.SET_OP, {key, value, lifetime});
    };
    // replace
    members.replace = function replace(key, value, lifetime) {
        return request(constants.REPLACE_OP, {key, value, lifetime});
    };

    // add
    members.add = function add(key, value, lifetime) {
        return request(constants.ADD_OP, {key, value, lifetime});
    };
    // cas
    members.cas = function cas(key, value, lifetime, cas) {
        return request(constants.CAS_OP, {key, value, lifetime, cas});
    };
    // append
    members.append = function append(key, value) {
        return request(constants.APPEND_OP, {key, value});
    };
    // prepend
    members.prepend = function prepend(key, value) {
        return request(constants.PREPEND_OP, {key, value});
    };
    // incr
    members.incr = function incr(key, amount) {
        return request(constants.INCR_OP, {key, amount});
    };
    // decr
    members.decr = function decr(key, amount) {
        return request(constants.DECR_OP, {key, amount});
    };
    // del
    members.del = function del(key) {
        return request(constants.DEL_OP, {key});
    };
    // version
    members.version = function version() {
        return request(constants.VERSION_OP);
    };
    // flush
    members.flush = function flush() {
        return request(constants.FLUSH_OP);
    };
    // stats
    members.stats = function stats() {
        return request(constants.STATS_OP);
    };
    // settings
    members.settings = function settings() {
        return request(constants.SETTINGS_OP);
    };
    // slabs
    members.slabs = function slabs() {
        return request(constants.SLABS_OP);
    };
    // slabs
    members.items = function items() {
        return request(constants.ITEMS_OP);
    };
    // end TODO: there is no callback in end() method... Fix the code below
    members.end = function end() {
        return request(constants.END_OP);
    };
    return members;
};
