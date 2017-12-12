import unionBy from 'lodash-es/unionBy'
import clientinfo from './clientinfo'
import uaclass from './ua'
import osclass from './os'
import deviceclass from './device'
import * as defaultData from './regexes.json'

interface userAgentParser {
  regex: string,
  family_replacement?: string,
  v1_replacement?: string,
  v2_replacement?: string
}

interface osParser {
  regex: string,
  os_replacement?: string,
  os_v1_replacement?: string,
  os_v2_replacement?: string,
  os_v3_replacement?: string,
  os_v4_replacement?: string
}

interface deviceParser {
  regex: string,
  regex_flag?: string,
  device_replacement?: string,
  brand_replacement?: string,
  model_replacement?: string
}

interface parserRegex {
  user_agent_parsers: userAgentParser[],
  os_parsers: osParser[],
  device_parsers: deviceParser[]
}

class Parser {
  regex: parserRegex;

  constructor(regex: parserRegex) {
    this.regex = regex;
  }

  parse(userAgent: string) : clientinfo {
    let parseUA = uaclass.makeParser(this.regex.user_agent_parsers);
    let parseOS = osclass.makeParser(this.regex.os_parsers);
    let parseDevice = deviceclass.makeParser(this.regex.device_parsers);

    let ua = parseUA(userAgent);
    let os = parseOS(userAgent);
    let device = parseDevice(userAgent);

    return new clientinfo(ua, os, device);
  }
}

const uap =  (regex?: parserRegex) => {
  let data = (<any>defaultData);

  if (regex) {
    data.user_agent_parsers = unionBy(regex.user_agent_parsers, data.user_agent_parsers, 'regex');
    data.os_parsers = unionBy(regex.os_parsers, data.os_parsers, 'regex');
    data.device_parsers = unionBy(regex.device_parsers, data.device_parsers, 'regex');
  }
  return new Parser(data);
};

export = uap;