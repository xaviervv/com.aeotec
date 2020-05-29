'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class AeotecSmartSwitchSevenDevice extends ZwaveDevice {

  onMeshInit() {
    this.registerCapability('onoff', 'SWITCH_BINARY');
	this.registerCapability('measure_power', 'METER');
	this.registerCapability('measure_voltage', 'METER');
	this.registerCapability('measure_current', 'METER');
	this.registerCapability('meter_power', 'METER');
  }

}

module.exports = AeotecSmartSwitchSevenDevice;
