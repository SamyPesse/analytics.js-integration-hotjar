'use strict';

/**
 * Module dependencies.
 */

var integration = require('@segment/analytics.js-integration');

/**
 * Expose Hotjar integration.
 */

var Hotjar = module.exports = integration('Hotjar')
  .global('hj')
  .global('_hjSettings')
  .option('hjid')
  .option('hjsv')
  .option('tagEvents', true)
  .option('identifyTags', [ 'Logged In User' ]);

/**
 * Initialize.
 *
 * @api public
 */

Hotjar.prototype.initialize = function() {
  var hjid = this.options.hjid;
  var hjsv = this.options.hjsv;

    /* eslint-disable */
    (function(h,o,t,j,a,r) {
      h.hj=h.hj||function() {(h.hj.q=h.hj.q||[]).push(arguments);};
      h._hjSettings={ hjid:hjid,hjsv:hjsv };
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    /* eslint-enable */

  this.ready();
};

/**
 * Loaded?
 *
 * @api private
 * @return {boolean}
 */

Hotjar.prototype.loaded = function() {
  return !!window.hj;
};

/**
 * Identify.
 *
 * @api public
 * @param {Identify} identify
 */

Hotjar.prototype.identify = function() {
  var identifyTags = this.options.identifyTags;

  if (identifyTags) {
    window.hj('tagRecording',  identifyTags);
  }
};

/**
 * Track.
 *
 * https://help.hotjar.com/hc/en-us/articles/115011819488-Tagging-Recordings
 *
 * @api public
 * @param {Track} track
 */

Hotjar.prototype.track = function(track) {
  var eventName = track.event();
  var tagEvents = this.options.tagEvents;

  if (!tagEvents) {
    return;
  }

  window.hj('tagRecording',  [ eventName ]);
};
