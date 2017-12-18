var helpers = require('yeoman-test');
var path = require('path');
var fs = require('fs-extra');

describe('Check file for yo', function () {
  it('verify the right file', function () {
      helpers.run(path.join(__dirname, '../app'))
		.inTmpDir(function (dir) {
			fs.copySync(path.join(__dirname, '../templates'), dir)
		})
		.then(function () {
			assert.file('index.html');
		});
  });
});