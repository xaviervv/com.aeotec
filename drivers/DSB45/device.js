'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class AeotecWaterSensorDevice extends ZwaveDevice {

  onMeshInit() {
    this.registerCapability('alarm_water', 'BASIC', {
      get: 'BASIC_GET',
      set: 'BASIC_SET',
      report: 'BASIC_REPORT',
      reportParser: report => {
        if (report['Value']) return report['Value'] !== 0;
        if (report['Value (Raw)']) {
          return report['Value (Raw)'][0] !== 0;
        }
        return null;
      },
    });
    this.registerReportListener('SENSOR_BINARY', 'SENSOR_BINARY_REPORT', report => {
      if (report['Sensor Value']) {
        this.setCapabilityValue('alarm_water', report['Sensor Value'] === 'detected an event');
      }
    });

    this.registerCapability('measure_battery', 'BATTERY');
  }

}

module.exports = AeotecWaterSensorDevice;
