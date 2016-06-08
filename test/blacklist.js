'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;

describe('blacklist', function() {

  var config = { modules: { fs: 1, http: 2 }, logger: sinon.spy(), patchGlobal: true };
  require = require('../')(config);

  it('should throw on restricted modules', function(done) {
    try {
      require('http');
    } catch (e) {
      expect(e).to.exist;
      expect(e.message).to.contain('http');
      done();
    }
  });

  it('it should log on specific modules', function() {
    require('fs');
    expect(config.logger.calledOnce).to.be.true;
    expect(config.logger.calledWith('Access to package fs was attempted')).to.be.true;
  });

  it('should patch globally', function(done) {
    try {
      require('./test/test-http');
    } catch (e) {
      expect(e).to.exist;
      expect(e.message).to.contain('http');
      done();
    }
  });
});
