import ua from './ua'
import os from './os'
import device from './device'

export default class ClientInfo {
  ua: ua;
  os: os;
  device: device;
  constructor(ua: ua, os: os, device: device) {
    this.ua = ua;
    this.os = os;
    this.device = device;
  }
  toString() {
    return JSON.stringify(this, undefined, 4);
  }
}
