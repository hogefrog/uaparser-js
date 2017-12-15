import * as assert from 'power-assert';
import * as mocha from "mocha";
import * as uap from '../dist/uaparser.min.js';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';
import { UATestCase, OSTestCase, DeviceTestCase } from './models.spec'

const testsDir = path.join('uap-core', 'tests/');
const tests = {
  'os': path.join(testsDir + 'test_os.yaml'),
  'device': path.join(testsDir + 'test_device.yaml'),
  'ua': path.join(testsDir + 'test_ua.yaml')
};

const optionalTestsDir = path.join('test', 'resource/');
const optionalTests = {
  'os': path.join(optionalTestsDir + 'optional_os.yaml'),
  'device': path.join(optionalTestsDir + 'optional_device.yaml'),
  'ua': path.join(optionalTestsDir + 'optional_ua.yaml')
};

const optionalFilePath = path.join('test', 'resource', 'optional_regexes.yaml');
const optionalPattern = parseYaml(optionalFilePath);

describe('Embedded Pattern Matching', () => {
  it('OS tests (UAP Core Test Resource)', () => {
    const fixtures = <OSTestCase[]>(parseYaml(tests.os)).test_cases;
    fixtures.forEach(element => {
      const testcase = new OSTestCase(element);
      const result = uap().parse(testcase.user_agent_string);
      assert.equal(result.os.family, testcase.family);
      assert.equal(result.os.major, testcase.major);
      assert.equal(result.os.minor, testcase.minor);
      assert.equal(result.os.patch, testcase.patch);
      assert.equal(result.os.patchMinor, testcase.patch_minor);
    });
  });

  it('Devices tests (UAP Core Test Resource)', () => {
    const fixtures = <DeviceTestCase[]>(parseYaml(tests.device)).test_cases;
    fixtures.forEach(element => {
      const testcase = new DeviceTestCase(element);
      const result = uap().parse(testcase.user_agent_string);
      assert.equal(result.device.family, testcase.family);
      assert.equal(result.device.brand, testcase.brand);
      assert.equal(result.device.model, testcase.model);
    });
  });

  it('UA tests (UAP Core Test Resource)', () => {
    const fixtures = <UATestCase[]>(parseYaml(tests.ua)).test_cases;
    fixtures.forEach(element => {
      const testcase = new UATestCase(element);
      const result = uap().parse(testcase.user_agent_string);
      assert.equal(result.ua.family, testcase.family);
      assert.equal(result.ua.major, testcase.major);
      assert.equal(result.ua.minor, testcase.minor);
      assert.equal(result.ua.patch, testcase.patch);
    });
  });
});

describe('Optional Pattern Matching',  () => {
  it('OS tests (UAP Core Test Resource)', () => {
    const fixtures = <OSTestCase[]>(parseYaml(tests.os)).test_cases;
    fixtures.forEach(element => {
      const testcase = new OSTestCase(element);
      const result = uap(optionalPattern).parse(testcase.user_agent_string);
      assert.equal(result.os.family, testcase.family);
      assert.equal(result.os.major, testcase.major);
      assert.equal(result.os.minor, testcase.minor);
      assert.equal(result.os.patch, testcase.patch);
      assert.equal(result.os.patchMinor, testcase.patch_minor);
    });
  });

  it('OS tests (Optional Resource)', () => {
    const fixtures = <OSTestCase[]>(parseYaml(optionalTests.os).test_cases);
    fixtures.forEach(element => {
      const testcase = new OSTestCase(element);
      const result = uap(optionalPattern).parse(testcase.user_agent_string);
      assert.equal(result.os.family, testcase.family);
      assert.equal(result.os.major, testcase.major);
      assert.equal(result.os.minor, testcase.minor);
      assert.equal(result.os.patch, testcase.patch);
      assert.equal(result.os.patchMinor, testcase.patch_minor);
    });
  });

  it('Devices tests (UAP Core Test Resource)', () => {
    const fixtures = <DeviceTestCase[]>(parseYaml(tests.device)).test_cases;
    fixtures.forEach(element => {
      const testcase = new DeviceTestCase(element);
      const result = uap(optionalPattern).parse(testcase.user_agent_string);
      assert.equal(result.device.family, testcase.family);
      assert.equal(result.device.brand, testcase.brand);
      assert.equal(result.device.model, testcase.model);
    });
  });

  it('Device tests (Optional Resource', () => {
    const fixtures = <DeviceTestCase[]>(parseYaml(optionalTests.device)).test_cases;
    fixtures.forEach(element => {
      const testcase = new DeviceTestCase(element);
      const result = uap(optionalPattern).parse(testcase.user_agent_string);
      assert.equal(result.device.family, testcase.family);
      assert.equal(result.device.brand, testcase.brand);
      assert.equal(result.device.model, testcase.model);
    });
  });

  it('UA tests (UAP Core Test Resource)', () => {
    const fixtures = <UATestCase[]>(parseYaml(tests.ua)).test_cases;
    fixtures.forEach(element => {
      const testcase = new UATestCase(element);
      const result = uap(optionalPattern).parse(testcase.user_agent_string);
      assert.equal(result.ua.family, testcase.family);
      assert.equal(result.ua.major, testcase.major);
      assert.equal(result.ua.minor, testcase.minor);
      assert.equal(result.ua.patch, testcase.patch);
    });
  });

  it('UA tests (Optional Resource)', () => {
    const fixtures = <UATestCase[]>(parseYaml(optionalTests.ua)).test_cases;
    fixtures.forEach(element => {
      const testcase = new UATestCase(element);
      const result = uap(optionalPattern).parse(testcase.user_agent_string);
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