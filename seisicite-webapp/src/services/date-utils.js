import moment from 'moment';

export function toLocalDate(date) {
  const mome = moment(date, moment.ISO_8601);

  return mome.format('L');
}