import {
  formatDate,
  formatDateUTC,
  formatTimestampToDate,
  formatDateToTimestamp,
} from '../../src/utils/converters';

describe('UTILS - CONVERTERS', () => {
  it('Should be convert date to YYYY-MM-DD HH:mm:ss', async (done) => {
    const currentDate = formatDate('2021-02-01T12:34:05.077Z');
    expect(currentDate).toEqual('2021-02-01 09:34:05');
    done();
  });

  it('Should be convert date to UTC', async (done) => {
    const currentDate = formatDateUTC('2021-02-01T12:34:05.077Z');
    expect(currentDate).toEqual('2021-02-01T09:34:05.077-03:00');
    done();
  });

  it('Should be convert timestamp to date', async (done) => {
    const currentDate = formatTimestampToDate(1612182845);
    expect(currentDate).toEqual('2021-02-01 09:34:05');
    done();
  });

  it('Should be convert date to timestamp', async (done) => {
    const currentDate = formatDateToTimestamp('2021-02-01T12:34:05');
    expect(currentDate).not.toBeNull();
    done();
  });
});
