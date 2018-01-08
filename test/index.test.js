var Analytics = require('@segment/analytics.js-core').constructor;
var integration = require('@segment/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var Hotjar = require('../lib/');

describe('Hotjar', function() {
  var analytics;
  var hotjar;
  var options = {
        hjid: '250523',
        hjsv: '5'
  };

  beforeEach(function() {
    analytics = new Analytics();
    hotjar = new Hotjar(options);
    analytics.use(Hotjar);
    analytics.use(tester);
    analytics.add(hotjar);
  });

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    hotjar.reset();
    sandbox();
  });

  it('should have the correct settings', function() {
    analytics.compare(Hotjar, integration('Hotjar')
      .global('hj')
      .global('_hjSettings')
      .option('hjid')
      .option('hjsv'));
  });

  describe('before loading', function() {
    describe('#initialize', function() {
      it('should pass options to _hjSettings', function() {
        analytics.initialize();
        analytics.page();
        analytics.equal(window._hjSettings.hjid, options.hjid);
        analytics.equal(window._hjSettings.hjsv, options.hjsv);
      });
    });
  });

  describe('after loading', function() {
    beforeEach(function(done) {
      analytics.once('ready', done);
      analytics.initialize();
      analytics.page();
    });
  });
});
