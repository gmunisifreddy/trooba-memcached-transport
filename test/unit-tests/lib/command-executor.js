
const Assert = require('assert');
const sinon = require('sinon');
const commandExecutor = require(`${process.cwd()}/lib/command-executor`)();

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