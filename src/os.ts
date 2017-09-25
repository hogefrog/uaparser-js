import * as helpers from './helpers'

export default class OSClass {
  family: string;
  major: string;
  minor: string;
  patch: string;
  patchMinor: string;
  constructor(family: string | undefined = undefined, major: string | undefined = undefined, minor: string | undefined = undefined, patch: string | undefined = undefined, patchMinor: string | undefined = undefined) {
    this.family = family ? family.trim() : 'Other';
    this.major = major ? major.trim() : '';
    this.minor = minor ? minor.trim() : '';
    this.patch = patch ? patch.trim() : '';
    this.patchMinor = patchMinor ? patchMinor.trim() : '';
  }
  toVersionString = function () {
    let output = helpers.versionString(this.major, this.minor, this.patch, this.patchmMinor);
    return output || '';
  };

  toString = function () {
    let suffix = this.toVersionString();
    if (suffix) { suffix = ' ' + suffix; }
    return this.family + suffix;
  };

  static _makeParsers(obj) {
    var regexp = new RegExp(obj.regex, obj.regex_flag);
    var famRep = obj.os_replacement;
    var majorRep = obj.os_v1_replacement;
    var minorRep = obj.os_v2_replacement;
    var patchRep = obj.os_v3_replacement;
    var patchMinorRep = obj.os_v4_replacement;

    function parser(str) {
      let m = str.match(regexp);
      if (!m) { return ''; }

      let family = famRep ? m[0].replace(regexp, famRep) : m[1];
      let major = majorRep ? m[0].replace(regexp, majorRep) : m[2];
      let minor = minorRep ? m[0].replace(regexp, minorRep) : m[3];
      let patch = patchRep ? m[0].replace(regexp, patchRep) : m[4];
      let patchMinor = patchMinorRep ? m[0].replace(regexp, patchMinorRep) : m[5];

      return new OSClass(family, major, minor, patch, patchMinor);
    }

    return parser;
  }

  static makeParser(regexes) {
    var parsers = regexes.map(OSClass._makeParsers)

    function parser(str) {
      let obj;

      if (typeof str === 'string') {
        for (let i = 0, length = parsers.length; i < length; i++) {
          obj = parsers[i](str);
          if (obj) { return obj; }
        }
      }

      return obj || new OSClass();
    }

    return parser;
  }
}
