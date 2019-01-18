
const Assert = require('assert');
const Trooba = require('trooba');
const sinon = require('sinon');
var appRoot = require('app-root-path');
const connectionPool = require(appRoot +'/lib/connection-pool')();

describe(__filename, () => {
    it('pool.get should return a mock connection if passed in parameters', async () => {
        const memcacheMock = {
            append: sinon.stub().yields(null, true)
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const actualConnection = connectionPool.get(memcachedConfigs);
       
        Assert.deepEqual(actualConnection, memcachedConfigs.connection);        
    });
    it('pool.get should return an existing object from pool when existing connection is requested', async () => {        
        //Dont specify the servers so that connection is not initiated in tests
        const configs = {
            clientId: 'test-client'
        };

        const firstInstance = connectionPool.get(configs);
        const secondInstance = connectionPool.get(configs);
       
        Assert.deepEqual(firstInstance, secondInstance);        
    });
});