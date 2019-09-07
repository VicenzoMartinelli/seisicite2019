import moment from 'moment';

export function toLocalTimeString(date) {
  const mome = moment(date, moment.ISO_8601);

  return mome.local().format('LT');
}
export function toLocalDateShortString(date) {
  const mome = moment(date, moment.ISO_8601);

  return mome.local().format('L');
}

export function toLocalDate(date) {
  const mome = moment(date, moment.ISO_8601);

  return mome.local();
}
