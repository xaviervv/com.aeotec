'use strict';

const Homey = require('homey');

class AeotecNanoMoteDeviceDriver extends Homey.Driver {
    
	onInit() {
        super.onInit();	
		
        this.press1Trigger = new Homey.FlowCardTriggerDevice('zwa003-c_press_1').register();
        this.press2Trigger = new Homey.FlowCardTriggerDevice('zwa003-c_press_2').register();
        this.press3Trigger = new Homey.FlowCardTriggerDevice('zwa003-c_press_3').register();
        this.press4Trigger = new Homey.FlowCardTriggerDevice('zwa003-c_press_4').register();

        this.hold1Trigger = new Homey.FlowCardTriggerDevice('zwa003-c_hold_1').register();
        this.hold2Trigger = new Homey.FlowCardTriggerDevice('zwa003-c_hold_2').register();
        this.hold3Trigger = new Homey.FlowCardTriggerDevice('zwa003-c_hold_3').register();
        this.hold4Trigger = new Homey.FlowCardTriggerDevice('zwa003-c_hold_4').register();
    }
}

module.exports = AeotecNanoMoteDeviceDriver;
