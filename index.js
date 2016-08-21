var cp = require('child_process');

module.exports = function whereis(name, cb) {
  var stdout_0 = cp.execSync('which ' + name);
  stdout_0 = stdout_0.split('\n')[0]
  if(stdout_0 === '' || stdout_0.charAt(0) !== '/') {
    var stdout_1 = cp.execSync('whereis' + name);
    if(stdout_1 === '' || stdout_1.indexOf( '/' ) === -1) {
      var stdout_2 = cp.execSync('where ' + name);
      if(stdout_2 === '' || stdout_2.indexOf('\\') === -1) {
        var stdout_3 = cp.execSync('for %i in (' + name + '.exe) do @echo. %~$PATH:i');
        if(stdout_3 === '' || stdout_3.indexOf('\\') === -1) {
          return {
            err: new Error('Could not find ' + name + ' on your system'),
            path: null
          };
        } else {
          return {
            err: null,
            path: stdout_3
          };
        }
      } else {
        return {
          err: null,
          path: stdout_2
        };
      }
    } else {
      return {
        err: null,
        path:　stdout_1.split(' ')[1]
      };
    }
  } else {
    return {
      err: null,
      path: stdout_0
    };
  }
};
