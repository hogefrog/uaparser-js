import * as helpers from './helpers'

export default class DeviceClass {
  family: string;
  brand: string;
  model: string;
  constructor(family: string | undefined = undefined, brand: string | undefined = undefined, model: string | undefined = undefined) {
    this.family = family ? family.trim() : 'Other';
    this.brand = brand ? brand.trim() : '';
    this.model = model ? model.trim() : '';
  }
  toString() {
    return this.family;
  }
  isSpider() {
    return "spider" === this.family.trim().toLowerCase();
  }

  static makeParser(regexes) {
    var parsers = regexes.map(function (obj) {
      var regexp = new RegExp(obj.regex, obj.regex_flag);
      var deviceRep = obj.device_replacement;
      var brandRep = obj.brand_replacement;
      var modelRep = obj.model_replacement;

      function parser(str) {
        let m = str.match(regexp);
        if (!m) { return undefined; }

        let family = deviceRep ? m[0].replace(regexp, deviceRep) : m[1];
        let brand = brandRep ? m[0].replace(regexp, brandRep) : '';
        let model = modelRep ? m[0].replace(regexp, modelRep) : m[1];

        return new DeviceClass(family, brand, model);
      }

      return parser;
    });

    function parser(str, ua_family = '', os_family = '') {
      let obj;

      if (typeof str === 'string') {
        for (var i = 0, length = parsers.length; i < length; i++) {
          obj = parsers[i](str, ua_family, os_family);
          if (obj) { return obj; }
        }
      }

      return obj || new DeviceClass();
    }

    return parser;
  }
}
