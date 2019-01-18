
const Assert = require('assert');
const Trooba = require('trooba');
const sinon = require('sinon');
var appRoot = require('app-root-path');
const commandExecutor = require(appRoot +'/lib/command-executor')();

describe(__filename, () => {
    it('should call pipe.throw when an error occurs', async () => {
        const connectionMock = {
            touch: sinon.stub().yields('error')
        };
        const pipeSpy = {
            throw: sinon.spy(),
            respond: sinon.spy()
        };
        commandExecutor.touch(pipeSpy, connectionMock, {});
        Assert.equal(pipeSpy.throw.calledOnce, true);
        Assert.equal(pipeSpy.respond.notCalled, true);        
    });
});