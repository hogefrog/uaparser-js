import * as helpers from './helpers'
import OS from './os'

export default class UAClass {
  family: string;
  major: string;
  minor: string;
  patch: string;
  constructor(family: string | undefined = undefined, major: string | undefined = undefined, minor: string | undefined = undefined, patch: string | undefined = undefined) {
    this.family = family ? family.trim() : 'Other';
    this.major = major ? major.trim() : '';
    this.minor = minor ? minor.trim() : '';
    this.patch = patch ? patch.trim() : '';
  }
  toVersionString = function () {
    let output = helpers.versionString(this.major, this.minor, this.patch);
    return output || '';
  };

  toString = function () {
    let suffix = this.toVersionString();
    if (suffix) { suffix = ' ' + suffix; }
    return this.family + suffix;
  };

  static _makeParsers(obj) {
    var regexp = new RegExp(obj.regex, obj.regex_flag);
    var famRep = obj.family_replacement;
    var majorRep = obj.v1_replacement;
    var minorRep = obj.v2_replacement;
    var patchRep = obj.v3_replacement;

    function parser(str) {
      let m = str.match(regexp);
      if (!m) { return undefined; }

      let family = famRep ? m[0].replace(regexp, famRep) : m[1];
      let major = majorRep ? m[0].replace(regexp, majorRep) : m[2];
      let minor = minorRep ? m[0].replace(regexp, minorRep) : m[3];
      let patch = patchRep ? m[0].replace(regexp, patchRep) : m[4];

      return new UAClass(family, major, minor, patch);
    }

    return parser;
  }

  static makeParser(regexes) {
    var parsers = regexes.map(UAClass._makeParsers)

    function parser(str) {
      let obj;

      if (typeof str === 'string') {
        for (let i = 0, length = parsers.length; i < length; i++) {
          obj = parsers[i](str);
          if (obj) { return obj; }
        }
      }

      return obj || new UAClass();
    }

    return parser;
  }
}
