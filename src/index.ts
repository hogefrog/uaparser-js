import * as yaml from 'js-yaml'

import clientinfo from './clientinfo'
import uaclass from './ua'
import osclass from './os'
import deviceclass from './device'

export const parse = (useragent: string, regexesData: string): clientinfo => {
  let regexes = yaml.load(regexesData);

  let parseUA = uaclass.makeParser(regexes.user_agent_parsers);
  let parseOS = osclass.makeParser(regexes.os_parsers);
  let parseDevice = deviceclass.makeParser(regexes.device_parsers);

  let ua = parseUA(useragent);
  let os = parseOS(useragent);
  let device = parseDevice(useragent);

  return new clientinfo(ua, os, device);
}
