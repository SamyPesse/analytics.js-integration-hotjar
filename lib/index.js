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
  .option('recordVisitors', true)
  .option('identifyTags', [ 'Logged In User' ]);

/**
 * Initialize.
 *
 * @api public
 */

Hotjar.prototype.initialize = function() {
  var hjid = this.options.hjid;
  var hjsv = this.options.hjsv;

  window.hj = window.hj || function() {(window.hj.q=window.hj.q||[]).push(arguments);};
  window._hjSettings = {
    hjid: hjid,
    hjsv: hjsv
  };

  if (this.options.recordVisitors) {
    appendHotjarScript();
  }

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

  if (!this.options.recordVisitors) {
    appendHotjarScript();
  }

  if (this.options.identifyTags) {
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

var script;
function appendHotjarScript() {
  if (script) {
    return;
  }

  var head = document.getElementsByTagName('head')[0];
  script = head.createElement('script');
  script.async=1;

  script.src='https://static.hotjar.com/c/hotjar-'+window._hjSettings.hjid+'.js?sv='+window._hjSettings.hjsv;

  head.appendChild(script);
}
