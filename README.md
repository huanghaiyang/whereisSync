# whereisSync
Simply get the first path to a bin on any system by sync

## you should know
this project copyed from [https://github.com/vvo/node-whereis](https://github.com/vvo/node-whereis)
but I removed whereis cmd from it.

## note
you can't use it to find files except ./bin file or .exe file.

## install
```
npm install whereissync --save
```

## how to use
```javascript
var whereis = require('whereis');
var result = whereis('wget');
console.log(result.path);
// /usr/bin/wget
```

## what is the result
An Object contains two property, meta type like:
```javascript
{
  err: Object // or Error
  path: String // bin path or null
}
```
