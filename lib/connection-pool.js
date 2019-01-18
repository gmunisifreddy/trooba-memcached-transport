const Memcached = require('memcached');

module.exports = function moduleDef() {
    const members = {};
    const connections = [];

    function connect(clientConfigs) {
        return new Memcached(clientConfigs.servers, clientConfigs.options);
    }

    members.get = function get(configs) {
        // if any mock connection is passed as parameter then return it
        if(configs.connection){
            return configs.connection;
        }
        // Setup a new connection if it is not in the pool
        if (!connections[configs.clientId]) {
            connections[configs.clientId] = connect(configs);
        }
        return connections[configs.clientId];
    };
    members.remove = function remove(configs){
        // Remove connection from the pool. 
        // Expected to be called on memcached.end operations
        delete connections[configs.clientId];
    }
    return members;
};
