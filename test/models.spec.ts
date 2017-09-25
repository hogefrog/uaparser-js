export class UATestCase {
  user_agent_string: string
  family: string
  major: string
  minor: string
  patch: string

  constructor({
    user_agent_string,
    family,
    major,
    minor,
    patch
  }) {
    this.user_agent_string = user_agent_string || '';
    this.family = family || '';
    this.major = major || '';
    this.minor = minor || '';
    this.patch = patch || '';
  }
}

export class OSTestCase {
  user_agent_string: string
  family: string
  major: string
  minor: string
  patch: string
  patch_minor: string

  constructor({
    user_agent_string,
    family,
    major,
    minor,
    patch,
    patch_minor
  }) {
    this.user_agent_string = user_agent_string || '';
    this.family = family || '';
    this.major = major || '';
    this.minor = minor || '';
    this.patch = patch || '';
    this.patch_minor = patch_minor || '';
  }
}

export class DeviceTestCase {
  user_agent_string: string
  family: string
  brand: string
  model: string

  constructor({
    user_agent_string,
    family,
    brand,
    model
  }) {
    this.user_agent_string = user_agent_string || '';
    this.family = family || '';
    this.brand = brand || '';
    this.model = model || '';
  }
}