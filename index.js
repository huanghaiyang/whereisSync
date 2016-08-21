var cp = require('child_process');

function getReturn(err, path) {
  return {
    err: err,
    path: path
  }
}

module.exports = function whereis(name, cb) {
  try{
    var stdout = cp.execSync('which ' + name).toString();
    stdout = stdout.split('\n')[0];
    if(stdout === '' || stdout.charAt(0) !== '/') {
      try{
        var stdout = cp.execSync('where ' + name).toString();
        if(stdout === '' || stdout.indexOf('\\') === -1) {
          try{
            var stdout = cp.execSync('for %i in (' + name + '.exe) do @echo. %~$PATH:i').toString();
            if(stdout === '' || stdout.indexOf('\\') === -1) {
              return getReturn(new Error('Could not find ' + name + ' on your system'), null);
            } else {
              return getReturn(null, stdout);
            }
          }catch(e) {
            return getReturn(e, null);
          }
        } else {
          return getReturn(null, stdout);
        }
      } catch(e){
        return getReturn(e, null);
      }
    } else {
      return getReturn(null, stdout);
    }
  } catch (e) {
    return getReturn(e, null);
  }
};
