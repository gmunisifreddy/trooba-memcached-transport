
const Assert = require('assert');
const Trooba = require('trooba');
const sinon = require('sinon');

const memcacheTransport = require('..');

describe(__filename, () => {
    it('should create a separate connection for new client instance', async () => {
        const memcacheMock1 = {
            append: sinon.stub().yields(null, true)
        };
        const memcacheMock2 = {
            append: sinon.stub().yields(null, true)
        };
        const client1 = getTroobaClient({
            connection: memcacheMock1
        });
        const client2 = getTroobaClient({
            connection: memcacheMock2
        });
        Assert.deepEqual(client1.connection, client2.connection);
    });
    it('should re-use connection stored in client instance', async () => {
        const append = sinon.stub().yields(null, true)
        const memcacheMock = {
            append
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);
        await client.append('test-key1', 'some-data1');
        await client.append('test-key1', 'some-data2');
        Assert.ok(2, append.calledTwice);
        
    });
    it('verify touch method', async () => {
        const memcacheMock = {
            touch: sinon.stub().yields(null, true)
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);            
        await client.touch('test-key', 20);
        // Verify 
        assertCalledOnceWithTwoArgs(memcacheMock.touch, 'test-key', 20);        
    });
    it('verify get method', async () => {
        // Build mocks and call api
        const memcacheMock = {
            get: sinon.stub().yields(null, 'some-value')
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);             
        await client.get('test-key');
        // Verify 
        assertCalledOnceWithOneArg(memcacheMock.get, 'test-key');
    });
    it('verify gets method', async () => {  
        // Build mocks and call api      
        const memcacheMock = {
            gets: sinon.stub().yields(null, 'some-value')
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs)       ;
        await client.gets('test-key');
        // Verify 
        assertCalledOnceWithOneArg(memcacheMock.gets, 'test-key');
    }); 
    it('verify getMulti method', async () => {  
        // Build mocks and call api      
        const memcacheMock = {
            getMulti: sinon.stub().yields(null, 'some-value')
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs)       ;

        await client.getMulti(['test-key-1', 'test-key-2']);
        // Verify 
        assertCalledOnceWithOneArg(memcacheMock.getMulti, ['test-key-1', 'test-key-2']);        
    }); 
    it('verify set method', async () => {
        const memcacheMock = {
            set: sinon.stub().yields(null, true)
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);                 
        await client.set('test-key', 'test-value', 20);
        // Verify 
        assertCalledOnceWithThreeArgs(memcacheMock.set, 'test-key', 'test-value', 20);        
    });
    it('verify replace method', async () => {
        const memcacheMock = {
            replace: sinon.stub().yields(null, true)
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);          

        await client.replace('test-key', 'test-value', 20);
        // Verify 
        assertCalledOnceWithThreeArgs(memcacheMock.replace, 'test-key', 'test-value', 20);        
    });
    it('verify add method', async () => {
        const memcacheMock = {
            add: sinon.stub().yields(null, true)
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);          
        await client.add('test-key', 'test-value', 20);
        // Verify 
        assertCalledOnceWithThreeArgs(memcacheMock.add, 'test-key', 'test-value', 20);        
    });
    it('verify cas method', async () => {
        const memcacheMock = {
            cas: sinon.stub().yields(null, true)
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);          
        
        await client.cas('test-key', 'test-value', 20, 'cas');
        // Verify 
        assertCalledOnceWithFourArgs(memcacheMock.cas, 'test-key', 'test-value', 20, 'cas');        
    });
    it('verify append method', async () => {
        const memcacheMock = {
            append: sinon.stub().yields(null, true)
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);                 
        await client.append('test-key', 'some-data');
        // Verify 
        assertCalledOnceWithTwoArgs(memcacheMock.append, 'test-key', 'some-data');        
    });
    it('verify prepend method', async () => {
        const memcacheMock = {
            prepend: sinon.stub().yields(null, true)
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);               
        await client.prepend('test-key', 'some-data');
        // Verify 
        assertCalledOnceWithTwoArgs(memcacheMock.prepend, 'test-key', 'some-data');        
    });
    it('verify incr method', async () => {
        const memcacheMock = {
            incr: sinon.stub().yields(null, true)
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);        

        await client.incr('test-key', 20);
        // Verify 
        assertCalledOnceWithTwoArgs(memcacheMock.incr, 'test-key', 20);
    });
    it('verify decr method', async () => {
        const memcacheMock = {
            decr: sinon.stub().yields(null, true)
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);        

        await client.decr('test-key', 20);
        // Verify 
        assertCalledOnceWithTwoArgs(memcacheMock.decr, 'test-key', 20);
    });
    it('verify del method', async () => {
        const memcacheMock = {
            del: sinon.stub().yields(null, true)
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);        

        await client.del('test-key', 20);
        // Verify 
        assertCalledOnceWithOneArg(memcacheMock.del, 'test-key', 20);
    });
    it('verify version method', async () => {
        const memcacheMock = {
            version: sinon.stub().yields(null, '1.2.323')
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);                
        const output = await client.version();
        // Verify 
        assertCalledOnceWithNoArgs(memcacheMock.version);
        Assert.equal(output, '1.2.323');
    });
    it('verify flush method', async () => {
        const memcacheMock = {
            flush: sinon.stub().yields(null)
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);                
        await client.flush();
        // Verify 
        assertCalledOnceWithNoArgs(memcacheMock.flush);
    });
    it('verify stats method', async () => {
        const memcacheMock = {
            stats: sinon.stub().yields(null, {})
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);                
        await client.stats();
        // Verify 
        assertCalledOnceWithNoArgs(memcacheMock.stats);
    });
    it('verify settings method', async () => {
        const memcacheMock = {
            settings: sinon.stub().yields(null, {})
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);                
        await client.settings();
        // Verify 
        assertCalledOnceWithNoArgs(memcacheMock.settings);
    });
    it('verify slabs method', async () => {
        const memcacheMock = {
            slabs: sinon.stub().yields(null, {})
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);                
        await client.slabs();
        // Verify 
        assertCalledOnceWithNoArgs(memcacheMock.slabs);
    });
    it('verify items method', async () => {
        const memcacheMock = {
            items: sinon.stub().yields(null, {})
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);                
        await client.items();
        // Verify 
        assertCalledOnceWithNoArgs(memcacheMock.items);
    });
    it('verify end method', async () => {
        const memcacheMock = {
            end: sinon.stub().yields(null)
        };
        const memcachedConfigs = {
            connection: memcacheMock
        };
        const client = getTroobaClient(memcachedConfigs);                
        await client.end();
        // Verify 
        assertCalledOnceWithNoArgs(memcacheMock.end);
    });    
    
    function assertCalledOnceWithNoArgs(stub) {
        Assert.equal(stub.calledOnce, true);        
        Assert.equal(stub.getCall(0).args.length, 1);
        Assert.equal(typeof(stub.getCall(0).args[0]), 'function');
    }
    function assertCalledOnceWithOneArg(stub, arg1) {
        Assert.equal(stub.calledOnce, true);        
        Assert.equal(stub.getCall(0).args.length, 2);
        Assert.deepEqual(stub.getCall(0).args[0], arg1);                
        Assert.equal(typeof(stub.getCall(0).args[1]), 'function');        
    }
    function assertCalledOnceWithTwoArgs(stub, arg1, arg2) {
        Assert.equal(stub.calledOnce, true);       
        Assert.equal(stub.getCall(0).args.length, 3); 
        Assert.deepEqual(stub.getCall(0).args[0], arg1);     
        Assert.deepEqual(stub.getCall(0).args[1], arg2);           
        Assert.equal(typeof(stub.getCall(0).args[2]), 'function');        
    }
    function assertCalledOnceWithThreeArgs(stub, arg1, arg2, arg3) {
        Assert.equal(stub.calledOnce, true);       
        Assert.equal(stub.getCall(0).args.length, 4); 
        Assert.deepEqual(stub.getCall(0).args[0], arg1);     
        Assert.deepEqual(stub.getCall(0).args[1], arg2);           
        Assert.deepEqual(stub.getCall(0).args[2], arg3);           
        Assert.equal(typeof(stub.getCall(0).args[3]), 'function');        
    }
    function assertCalledOnceWithFourArgs(stub, arg1, arg2, arg3, arg4) {
        Assert.equal(stub.calledOnce, true);        
        Assert.equal(stub.getCall(0).args.length, 5);
        Assert.deepEqual(stub.getCall(0).args[0], arg1);     
        Assert.deepEqual(stub.getCall(0).args[1], arg2);           
        Assert.deepEqual(stub.getCall(0).args[2], arg3);
        Assert.deepEqual(stub.getCall(0).args[3], arg4);
        Assert.equal(typeof(stub.getCall(0).args[4]), 'function');        
    }


    function getTroobaClient(memcachedConfigs){
        return Trooba
            .use(memcacheTransport, memcachedConfigs)
            .build()
            .create('client'); 
    } 
});

