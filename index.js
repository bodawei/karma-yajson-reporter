/**********************************************************************\
 Copyright 2017 柏大衛

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
\**********************************************************************/

/* eslint-env node */

'use strict';

const fs = require('fs');
const path = require('path');

/*
   For reference: API:

   injectables:
      baseReporterDecorator
      config
      logger
      helper
      formatError

   Functions:
         onRunStart()
            onBrowserStart(browser)
               renderBrowser(browser) ??
               onSpecComplete(browser, result)
               specSuccess(browser, result)
               specSkipped(browser, result)
               specFailure(browser, result)
            onBrowserComplete(browser, results)
         onRunComplete(browser, results)
      onExit
*/

const resultsPerBrowser = {};

function Results() {
   this.tests = {};
   this.counts = {
      tests: 0,
      passed: 0,
      skipped: 0,
      milliseconds: 0
   };
   this.duplicateNames = [];
}

/*
 * When a test completes, record information about its run
 */
function onSpecComplete(browser, result) {
   const browserName = browser.name;
   const fullTestName = result.suite.join(this._separator) + this._separator + result.description;

   resultsPerBrowser[browserName] = resultsPerBrowser[browserName] || new Results();

   const results = resultsPerBrowser[browserName];

   if (results.tests[fullTestName]) {
      results.duplicateNames.push(fullTestName);
   }

   results.tests[fullTestName] = {
      passed: result.success,
      skipped: result.skipped,
      milliseconds: result.time
   };

   results.counts.tests ++;
   results.counts.passed += result.success ? 1 : 0;
   results.counts.skipped += result.skipped ? 1 : 0;
   results.counts.milliseconds += result.milliseconds;
}

/*
 * When all the tests are run, write out the results in a separate directory for
 * each browser, and an overall summary file.
 */
function onRunComplete(browsers, results) {
   if (!fs.existsSync(this._dirPath)) {
      fs.mkdirSync(this._dirPath);
   }
   fs.writeFileSync(path.join(this._dirPath, 'all-' + this._fileName), JSON.stringify(results, undefined, 2));

   browsers.forEach((browser) => {
      const browserDir = path.join(this._dirPath, browser.name);
      const jsonData = JSON.stringify(resultsPerBrowser[browser.name], undefined, 2);

      if (!fs.existsSync(browserDir)) {
         fs.mkdirSync(browserDir);
      }
      fs.writeFileSync(path.join(this._dirPath, browser.name, this._fileName), jsonData);
   });
}

/*
 * Construct a reporter
 */
function YaJsonReporter(baseReporterDecorator, config) {
   baseReporterDecorator(this);   // Add a bunch of standard functionality to the instance we are constructing

   this.onSpecComplete = onSpecComplete;
   this.onRunComplete = onRunComplete;

   this._separator = config.separator || ' • ';
   this._dirPath = config.dirPath || './';
   this._fileName = config.fileName || 'yajson-summary.json';
}

YaJsonReporter.$inject = [ 'baseReporterDecorator', 'config.yaJsonReporter' ];

module.exports = {
   'reporter:yajson': [ 'type', YaJsonReporter ]
};
