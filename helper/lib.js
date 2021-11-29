/* eslint-disable no-mixed-operators */
function yearlyexpenses(expenses) {
  return expenses * 12;
}

function weeklyexpenses(expenses) {
  return expenses * 12 / 360 * 7;
}

function findDayDifferenceInYears(date1, date2) {
  return Math.floor((Math.abs(date2 - date1)) / (1000 * 60 * 60 * 24));
}

module.exports = { yearlyexpenses, weeklyexpenses, findDayDifferenceInYears };
