'use strict';
require('inspector').open(9229, '0.0.0.0', true);
const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;
const sceneMap = {
	1: '_press1Trigger',
    2: '_hold1Trigger',
    3: '_press2Trigger',
    4: '_hold2Trigger',
    5: '_press3Trigger',
    6: '_hold3Trigger',
    7: '_press4Trigger',
    8: '_hold4Trigger',
};

class AeotecNanoMoteDevice extends ZwaveDevice {

	onMeshInit() {
		this.registerCapability('measure_battery', 'BATTERY');
		this._press1Trigger = this.getDriver().press1Trigger;
        this._press2Trigger = this.getDriver().press2Trigger;
        this._press3Trigger = this.getDriver().press3Trigger;
        this._press4Trigger = this.getDriver().press4Trigger;

        this._hold1Trigger = this.getDriver().hold1Trigger;
        this._hold2Trigger = this.getDriver().hold2Trigger;
        this._hold3Trigger = this.getDriver().hold3Trigger;
        this._hold4Trigger = this.getDriver().hold4Trigger;

		
		this.registerReportListener('CENTRAL_SCENE', 'CENTRAL_SCENE_NOTIFICATION', (report) => {
            let debouncer = 0;

            if (report &&
				report.Properties1.hasOwnProperty('Key Attributes')) {
				const buttonValue = { scene: report.Properties1['Key Attributes'] };
				if (buttonValue.scene === 'Key Pressed 1 time') {
					if (debouncer === 0) {
						const sceneValue = { scene2: report['Scene Number']};
						if (sceneValue.scene2 === 1) {
						this._press1Trigger.trigger(this, null, buttonValue);
						}
						if (sceneValue.scene2 === 2) {
						this._press2Trigger.trigger(this, null, buttonValue);
						}
						if (sceneValue.scene2 === 3) {
						this._press3Trigger.trigger(this, null, buttonValue);
						}
						if (sceneValue.scene2 === 4) {
						this._press4Trigger.trigger(this, null, buttonValue);
						}
						debouncer++;
						setTimeout(() => debouncer = 0, 2000);
						
					}
				} else {
					
				}
				if (buttonValue.scene === 'Key Held Down') {
					if (debouncer === 0) {
						const sceneValue = { scene2: report['Scene Number']};
						if (sceneValue.scene2 === 1) {
						this._hold1Trigger.trigger(this, null, buttonValue);
						}
						if (sceneValue.scene2 === 2) {
						this._hold2Trigger.trigger(this, null, buttonValue);
						}
						if (sceneValue.scene2 === 3) {
						this._hold3Trigger.trigger(this, null, buttonValue);
						}
						if (sceneValue.scene2 === 4) {
						this._hold4Trigger.trigger(this, null, buttonValue);
						}
						debouncer++;
						setTimeout(() => debouncer = 0, 2000);
					}
				} else {

					

				}
				
			}
		});
	}

	buttonRunListener(args, state) {
		this.log(state.scene);
        this.log(args.scene);

        return (state && args &&
            state.hasOwnProperty('scene') &&
            args.hasOwnProperty('scene') &&
			state.scene === args.scene)
	}
}

module.exports = AeotecNanoMoteDevice;
