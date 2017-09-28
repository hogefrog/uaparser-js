import * as assert from 'power-assert';
import * as Mocha from 'mocha';
import Device from '../src/device';
import * as UAParser from '../src/index';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';
import { UATestCase, OSTestCase, DeviceTestCase } from './models.spec'

const testsDir = path.join('node_modules', 'uap-core', 'tests/');
const regexesFilePath = path.join('node_modules', 'uap-core', 'regexes.yaml');
const regexesData = fs.readFileSync(regexesFilePath, 'utf8');

const tests = {
  'os': path.join(testsDir + 'test_os.yaml'),
  'device': path.join(testsDir + 'test_device.yaml'),
  'ua': path.join(testsDir + 'test_ua.yaml')
};

describe('UAP Core Test Resource Matching', () => {
  it('OS tests', () => {
    const fixtures = <OSTestCase[]>(parseYaml(tests.os)).test_cases;
    fixtures.forEach(element => {
      const testcase = new OSTestCase(element)
      const result = UAParser.parse(testcase.user_agent_string, regexesData);
      assert.equal(result.os.family, testcase.family);
      assert.equal(result.os.major, testcase.major);
      assert.equal(result.os.minor, testcase.minor);
      assert.equal(result.os.patch, testcase.patch);
      assert.equal(result.os.patchMinor, testcase.patch_minor);
    });
  });

  it('Devices tests', () => {
    const fixtures = <DeviceTestCase[]>(parseYaml(tests.device)).test_cases;
    fixtures.forEach(element => {
      const testcase = new DeviceTestCase(element)
      const result = UAParser.parse(testcase.user_agent_string, regexesData);
      assert.equal(result.device.family, testcase.family);
      assert.equal(result.device.brand, testcase.brand);
      assert.equal(result.device.model, testcase.model);
    });
  });

  it('UA tests', () => {
    const fixtures = <UATestCase[]>(parseYaml(tests.ua)).test_cases;
    fixtures.forEach(element => {
      const testcase = new UATestCase(element)
      const result = UAParser.parse(testcase.user_agent_string, regexesData);
      assert.equal(result.ua.family, testcase.family);
      assert.equal(result.ua.major, testcase.major);
      assert.equal(result.ua.minor, testcase.minor);
      assert.equal(result.ua.patch, testcase.patch);
    });
  });
});

function parseYaml(fileName: string) {
  const file = fs.readFileSync(fileName);
  return yaml.load(file.toString(), { schema: yaml.FAILSAFE_SCHEMA });
}