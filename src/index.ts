import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'

import clientinfo from './clientinfo'
import uaclass from './ua'
import osclass from './os'
import deviceclass from './device'

const defaultFilePath = path.join('node_modules', 'uap-core', 'regexes.yaml')
const defaultRegexes = yaml.load(fs.readFileSync(defaultFilePath, 'utf8'));

export const parse = (useragent: string, filePath: string | undefined = defaultFilePath): clientinfo => {
  let regexes = defaultRegexes;
  if(filePath !== defaultFilePath) {
    regexes = yaml.load(fs.readFileSync(filePath, 'utf8'));
  }

  let parseUA = uaclass.makeParser(regexes.user_agent_parsers);
  let parseOS = osclass.makeParser(regexes.os_parsers);  
  let parseDevice = deviceclass.makeParser(regexes.device_parsers);
  
  let ua = parseUA(useragent);
  let os = parseOS(useragent);
  let device = parseDevice(useragent);

  return new clientinfo(ua, os, device);
}

(() => {
  if (require.main !== module) return;
  if (process.argv.length < 3) return;
  let ua = process.argv[2];
  let regexesFilePath = process.argv[3];
  let result = parse(ua, regexesFilePath);
  console.log(result);
})()
