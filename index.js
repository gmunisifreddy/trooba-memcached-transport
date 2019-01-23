
const Memcached = require('memcached');
const client = require('./lib/client');
const constants = require('./lib/constants');
const commandExecutor = require('./lib/command-executor')();

module.exports = function transportFactory() {
    function transport(pipe, config) {
        pipe.on('request', (options) => {
            const connection = pipe.context.$connection =
                pipe.context.$connection || config.connection ||
                    new Memcached(config.servers, config.options);

            switch (options.method) {
                case constants.TOUCH_OP:
                    commandExecutor.touch(pipe, connection, options.params);
                    break;
                case constants.GET_OP:
                    commandExecutor.get(pipe, connection, options.params);
                    break;
                case constants.GETS_OP:
                    commandExecutor.gets(pipe, connection, options.params);
                    break;
                case constants.GETMULTI_OP:
                    commandExecutor.getMulti(pipe, connection, options.params);
                    break;
                case constants.SET_OP:
                    commandExecutor.set(pipe, connection, options.params);
                    break;
                case constants.REPLACE_OP:
                    commandExecutor.replace(pipe, connection, options.params);
                    break;
                case constants.ADD_OP:
                    commandExecutor.add(pipe, connection, options.params);
                    break;
                case constants.CAS_OP:
                    commandExecutor.cas(pipe, connection, options.params);
                    break;
                case constants.APPEND_OP:
                    commandExecutor.append(pipe, connection, options.params);
                    break;
                case constants.PREPEND_OP:
                    commandExecutor.prepend(pipe, connection, options.params);
                    break;
                case constants.INCR_OP:
                    commandExecutor.incr(pipe, connection, options.params);
                    break;
                case constants.DECR_OP:
                    commandExecutor.decr(pipe, connection, options.params);
                    break;
                case constants.DEL_OP:
                    commandExecutor.del(pipe, connection, options.params);
                    break;
                case constants.VERSION_OP:
                    commandExecutor.version(pipe, connection);
                    break;
                case constants.FLUSH_OP:
                    commandExecutor.flush(pipe, connection);
                    break;
                case constants.STATS_OP:
                    commandExecutor.stats(pipe, connection);
                    break;
                case constants.SETTINGS_OP:
                    commandExecutor.settings(pipe, connection);
                    break;
                case constants.SLABS_OP:
                    commandExecutor.slabs(pipe, connection);
                    break;
                case constants.ITEMS_OP:
                    commandExecutor.items(pipe, connection);
                    break;
                case constants.END_OP:
                    commandExecutor.end(pipe, connection);
                    break;
                default:
                    pipe.throw(`Requested method '${options.method}' is not supported.`);
            }
        });
        pipe.set('client', client);
    }
    return transport;
};
