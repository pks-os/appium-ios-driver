import { errors } from 'mobile-json-wire-protocol';
import _ from 'lodash';
import { util } from 'appium-support';

let commands = {}, helpers = {}, extensions = {};

commands.getAttribute = async function (attribute, elementId) {
  if (this.isWebContext()) {
    /* TODO */throw new errors.NotYetImplementedError();
  } else {
    if (_.contains(['label', 'name', 'value', 'values', 'hint'], attribute)) {
      let command = `au.getElement('${elementId}').${attribute}()`;
      return await this.uiAutoClient.sendCommand(command);
    } else {
      throw new errors.UnknownCommandError(`UIAElements don't have the attribute '${attribute}'`);
    }
  }
};

commands.clear = async function (elementId) {
  if (this.isWebContext()) {
    /* TODO */throw new errors.NotYetImplementedError();
  } else {
    let command = `au.getElement('${elementId}').setValue('')`;
    await this.uiAutoClient.sendCommand(command);
  }
};

commands.setValueImmediate = async function (value, elementId) {
  value = util.escapeSpecialChars(value, "'");
  let command = `au.getElement('${elementId}').setValue('${value}')`;
  await this.uiAutoClient.sendCommand(command);
};

commands.setValue = async function (value, elementId) {
  if (this.isWebContext()) {
    /* TODO */throw new errors.NotYetImplementedError();
  } else {
    if (value instanceof Array) {
      value = value.join("");
    }
    value = util.escapeSpecialChars(value, "'");
    // de-escape \n so it can be used specially
    value = value.replace(/\\\\n/g, "\\n");
    if (this.useRobot) {
      /* TODO */throw new errors.NotYetImplementedError();
    } else {
      let command = `au.getElement('${elementId}').setValueByType('${value}')`;
      await this.uiAutoClient.sendCommand(command);
    }
  }
};

commands.keys = async function (keys) {
  // TODO: should not be needed -> keys = util.escapeSpecialChars(keys, "'");
  if (this.isWebContext()) {
    /* TODO */throw new errors.NotYetImplementedError();
  } else {
    var command = `au.sendKeysToActiveElement('${keys}')`;
    await this.uiAutoClient.sendCommand(command);
  }
};

commands.getText = async function (elementId) {
  if (this.isWebContext()) {
    /* TODO */throw new errors.NotYetImplementedError();
  } else {
    var command = `au.getElement('${elementId}').text()`;
    let res = await this.uiAutoClient.sendCommand(command);
    // in some cases instruments returns in integer. we only want a string
    res= res ? res.toString() : '';
    return res;
  }
};

Object.assign(extensions, commands, helpers);
export { commands, helpers };
export default extensions;