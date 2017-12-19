var helpers = require('yeoman-test');
var path = require('path');
var fs = require('fs-extra');
var assert = require('yeoman-assert');

describe('Check file for yo', function () {
  it('verify the right template', function () {
    return helpers.run(path.join(__dirname, '../app'))
		.inTmpDir(function (dir) {
			var done = this.async();
			fs.copySync(path.join(__dirname, '../app/templates'), dir, done)
		})
		.then(function (dir) {
			assert.file(path.join(__dirname, '../app/templates/index.html'));
		});
  });
});