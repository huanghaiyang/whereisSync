var
  cp = require('child_process'),
  test = require('tap').test,
  whereis = require('./');

test("when which found our program", function(t) {
  cp.execSync = function(name) {
    return '/etc/bin';
  };

  var result = whereis('bin');
  t.equal(result.path, '/etc/bin', 'bin was found');
  t.end();
});

test("when which did not found, whereis did not found, where will find", function(t) {
  var callcount = 0;
  cp.execSync = function(name, cb) {
    if (callcount < 2) {
      callcount++;
      return 'not found bin';
    } else {
      return 'C:\\etc\\bin';
    }
  };

  var result = whereis('bin');
  t.equal(result.path, 'C:\\etc\\bin', 'bin was found');
  t.end();
});

test("when which found it and output has linebreak", function(t) {
  cp.execSync = function(name, cb) {
    return '/etc/bin\n';
  };

  var result = whereis('bin');
  t.equal(result.path, '/etc/bin', 'bin was found');
  t.end();
});
