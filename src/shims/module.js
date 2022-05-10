const path = require('path');
const fs = require('fs');

class Module {
  constructor(id = '', parent) {
    this.id = id;
    this.path = path.dirname(id);
    this.exports = {};
    this.filename = null;
    this.loaded = false;
    this.children = [];
  }

  static builtinModules = [];

  static _nodeModulePaths(paths) {
    return [];
  }

  static _resolveFilename(requested, root) {
    const [rootDir, wcid] = root.filename.split('/').slice(1); // /@root/wcid
    const ret = path.join('/', rootDir, wcid, 'node_modules', requested);
    return fs.existsSync(ret) ? ret : fs.EMPTY_JSON_PATH;
  }
}

module.exports = Module;