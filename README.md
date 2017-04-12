# Yet Another JSON Reporter for Karma

## Introduction

There are ≈3.45 bazillion JSON reporters for Karma. Why would you want to use this one?

This reports the usual statistics about test runs in JSON format:

* An entry for each test (whether it passed, how long it took, etc)
* A total summary of tests run.

It also includes:

* A list of any test names that were used multiple times.

I created this because it drives me crazy when I copy, paste and modify a test but forget to update the name.  I wanted the information generated that would let me fail a build if I did this.

## Installation

1. `npm install --save-dev karma-ya-json-reporter`

## Usage

This is used like normal [Karma](http://karma-runner.github.io/1.0/intro/configuration.html) reporters.  Just add it to your karma configuration file, and provide the (optional) reporter configuration values:

```
      reporters: [ 'progress', 'yajson' ],

		...
		
      yaJsonReporter: {
         dirPath: 'testResults',
         fileName: 'test-summary.json',
         separator: ' > '
      }

```

**Note** There is an example directory included with this module which you can examine, run, and change to make sure you understand how to use this.

### Details
* Configuration values:
	* dirPath: Directory to write results to
	* fileName: Basic file name to write results for one browser to
	* separator: String to insert between hierarchical segments of a test name.

* Files written
   * ${dirPath}/${browserNameAndVersion}/${fileName}
	   * e.g. ./testResults/Safari 10.1.0 (Mac OS X 10.12.4)/test-summary.json
   * ${dirPath}/all-${fileName}
	   * e.g. ./testResults/all-test-summary.json
	

### Example Output 
```
{
  "tests": {
    "demonstration > this is a test which passes": {
      "passed": true,
      "skipped": false,
      "milliseconds": 15
    },
    "demonstration > this is a test which does not pass": {
      "passed": false,
      "skipped": false,
      "milliseconds": 1
    },
    "demonstration > this is a test which is skipped": {
      "passed": true,
      "skipped": true,
      "milliseconds": 0
    },
    "demonstration > this is a test with name A": {
      "passed": true,
      "skipped": false,
      "milliseconds": 0
    }
  },
  "counts": {
    "tests": 5,
    "passed": 4,
    "skipped": 1,
    "milliseconds": null
  },
  "duplicateNames": [
    "demonstration > this is a test with name A"
  ]
}
```

## Legalness
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
