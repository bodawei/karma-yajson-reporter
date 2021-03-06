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


describe("demonstration", function() {

	it("this is a test which passes", function() {
		expect(1).toEqual(1);
	});

	it("this is a test which does not pass", function() {
		expect(1).toEqual(0);
	});

	xit("this is a test which is skipped", function() {
		expect(1).toEqual(0);
	});

	it("this is a test with name A", function() {
		expect(1).toEqual(1);
	});

   // Duplicate test name
	it("this is a test with name A", function() {
		expect(1).toEqual(1);
	});

});
