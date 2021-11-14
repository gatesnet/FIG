/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const lib = require('../helper/lib');

// Get Home Expenses Controller
exports.getEducationExpenses = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      schools: Joi.number().required(),
      college: Joi.number().required(),
      courses: Joi.number().required(),
      other: Joi.number().required(),
    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const schools = parseFloat(req.params.schools, 10);
    const college = parseFloat(req.params.college, 10);
    const courses = parseFloat(req.params.courses, 10);
    const otherEducation = parseFloat(req.params.other, 10);
    const educationExpensesWeekly = [];
    const educationExpensesYearly = [];
    let totalEducationWeeklyExpenses = 0;
    let totalEducationYearlyExpenses = 0;

    const schoolsWeekly = lib.weeklyexpenses(schools);
    const collegeWeekly = lib.weeklyexpenses(college);
    const coursesWeekly = lib.weeklyexpenses(courses);
    const otherEducationWeekly = lib.weeklyexpenses(otherEducation);

    totalEducationWeeklyExpenses = schoolsWeekly + collegeWeekly + coursesWeekly + otherEducationWeekly;

    educationExpensesWeekly.push({
      schoolsWeekly,
      collegeWeekly,
      coursesWeekly,
      otherEducationWeekly,
      totalEducationWeeklyExpenses,
    });

    const schoolsYearly = lib.yearlyexpenses(schools);
    const collegeYearly = lib.yearlyexpenses(college);
    const coursesYearly = lib.yearlyexpenses(courses);
    const otherEducationYearly = lib.yearlyexpenses(otherEducation);

    totalEducationYearlyExpenses = schoolsYearly + collegeYearly + coursesYearly + otherEducationYearly;

    educationExpensesYearly.push({
      schoolsYearly,
      collegeYearly,
      coursesYearly,
      otherEducationYearly,
      totalEducationYearlyExpenses,
    });

    return res.status(200).send({ educationExpensesWeekly, educationExpensesYearly });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
