/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-boolean-value */
import * as React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Input from '../components/Input';
import Form from '../components/Form';

/**
 * Form Component
 * @class Form
 */
class Main extends React.Component {
  /**
     *
     * @param {object} props
     */
  constructor(props) {
    super(props);
    this.state = {
      currentYear: undefined,
      error: '',
      errorMessage: 'There is something wrong with information below, no car of this make model and year was found.',
      year: undefined,
      make: '',
      model: '',
      numberOfOwners: 1,
      initialValue: 0,
      finalValue: 0,
      submitted: false
    };
    this.onChange = this.onChange.bind(this);
  }

  /**
     * Get the current date so that we can calculate the year.
     */
  componentDidMount() {
    const currentDate = new Date();
    const currentYear = parseInt(currentDate.getFullYear(), 10);
    this.setState({ currentYear });
  }


  /**
     * Calculates the final value based on initial value, number of owners,
     * age, mileage, and number of collisions
     * // initail value supplied by customer
     * @params {number} initialValue
     * // The final value goes up by 10% if there was only one owner,
     * // and the initial value it goes down by 25% if there are more than two.
     * @params {number} numberOfOwners
     * // The age of the automobile reduces the value by .5% per month up to 120 months.
     * // This is applied to the initial value, but not cumulatively.
     * @params {number} age
     * // Optional, default is 0.  Reduces value by .2% every 1,000 miles up to 150,000 miles.
     * // This is applied to the initial value.
     * @params {number} mileage
     * // Optional, default is 0. Reduces value by 2%. This is applied to the initial value.
     * @params {number} collisions
     * // Returns the depricated value
     * @returns {number}
     */
    getFinalValue = (initVal, numberOfOwners, age, mileage, collisions) => {
      const { calculateDepreciation } = this;
      const localInitialValue = initVal;
      let localAge = age;
      const localMileage = mileage;
      const localcollisions = collisions;

      // Find depreciation due to mileage
      const lossMiles = calculateDepreciation(initVal, 1000, localMileage, 150000, 0.2);
      console.log('lossMiles', lossMiles);

      // Find depreciation due to collisions
      const lossCollisions = calculateDepreciation(localInitialValue, 1, localcollisions, 5, 2);
      console.log('lossCollisions', lossCollisions);

      // Find depreciation due to number of owners
      let lossOwners = 0;
      if (numberOfOwners > 2) {
        lossOwners = initVal * 0.25;
      }
      console.log('lossOwners', lossOwners);

      // Find depreciation due to age
      if (age > 10) {
        localAge = 10;
      }
      const ageInMonths = localAge * 12;
      const lossAge = initVal * (ageInMonths * 0.005);
      console.log('lossAge', lossAge);

      // Find the total deprecation of value
      console.log('initVal', initVal, 'lossAge', lossAge, 'lossCollisions', lossCollisions, 'lossOwners', lossOwners);
      let adjustedValue = initVal - lossAge - lossCollisions - lossMiles - lossOwners;
      if (numberOfOwners === 1) {
        adjustedValue *= 1.1;
      }
      console.log('All Values', initVal, lossAge, lossCollisions, lossMiles, lossOwners, adjustedValue);
      return adjustedValue;
    }

    /**
     * @params {number} value // Initial value to be depricated
     * // How much change needs to happen to the causeValue variable before a
     * // new depreciation occurs
     * @params {number} step
     * // Value of the cause of depreciation
     * @params {number} causeValue
     * // Value of the cause of depreciation that causes the maximum depreciation allowed
     * @params {number} causeLimit
     * //Percentage of deprecation at each step
     * @params {number} percentage
     * @returns {number}
     */
    calculateDepreciation = (value, step, causeValue, causeLimit, percentage) => {
      let tempValue = value;
      let tempCauseValue = causeValue;
      if (causeValue === 0) {
        return 0;
      }
      if (causeValue > causeLimit) {
        tempCauseValue = causeLimit;
      }
      for (let i = 0; i < tempCauseValue; i += step) {
        tempValue *= (1 - percentage / 100);
        console.log(value, tempValue, (1 - percentage / 100));
      }
      return value - tempValue;
    }

    /**
     * Generic handle Change Function
     * @params {any} target
     */
    handleSubmit = (event) => {
      event.preventDefault();
      const { state, getFinalValue } = this;
      const {
        initialValue,
        numberOfOwners,
        mileage,
        collisions,
        year,
        currentYear,
        make,
        model,
        errorMessage
      } = state;
      axios.post('/make', {
        make,
        model,
        year
      }).then((result) => {
        console.log(result);
        if (result.data.message === 'model found') {
          const age = currentYear - year;
          const finalValue = getFinalValue(initialValue, numberOfOwners, age, mileage, collisions);
          this.setState({ finalValue });
        } else {
          this.setState({ error: errorMessage });
        }
      }).catch((err) => {
        if (err) {
          this.setState({ error: errorMessage });
        }
      });
    }

    onChange = (target) => {
      const { name, value } = target.target;
      let tempValue = value;
      if (name === 'year' && value > this.state.currentYear) {
        tempValue = this.state.currentYear;
        this.setState({ [name]: tempValue });
      } else {
        this.setState({ [name]: value });
      }
    }

    render() {
      const {
        state,
        props,
        onChange,
        handleSubmit
      } = this;
      const {
        finalValue,
        initialValue,
        numberOfOwners,
        make,
        model,
        error,
        year,
        currentYear
      } = state;
      const {
        formName
      } = props;
      return (
        <div id="box">
          <Form
            className="form"
            name={formName}
          >
            <Input
              className="field"
              form={formName}
              type="number"
              name="year"
              min={1885}
              max={currentYear}
              text="Please select the year of your vehicle."
              value={this.state.year}
              onChange={onChange}
              required={true}
            />
            <Input
              className="field"
              form={formName}
              name="make"
              text="Please Enter the Make of Your Vehicle"
              value={this.state.make}
              type="text"
              onChange={onChange}
              required={true}
            />
            <Input
              className="field"
              form={formName}
              name="model"
              type="text"
              text="Please Enter the Model of Your Vehicle"
              value={this.state.model}
              onChange={onChange}
              required={true}
            />
            <Input
              className="field"
              form={formName}
              type="number"
              min={0}
              name="initialValue"
              text="What is the initial value of this car?"
              value={this.state.initialValue}
              onChange={onChange}
              required={true}
            />
            <Input
              className="field"
              form={formName}
              min={1}
              type="number"
              name="numberOfOwners"
              text="Enter the number of people who have owned this vehicle"
              value={this.state.numberOfOwners}
              onChange={onChange}
              required={true}
            />
            <Input
              className="field"
              min={0}
              form={formName}
              name="mileage"
              type="number"
              text="Please enter mileage of the vehicle"
              value={this.state.mileage}
              onChange={onChange}
              required={false}
            />
            <Input
              className="inputGroup"
              form={formName}
              min={0}
              name="collisions"
              type="number"
              text="How many collisions has this vehicle been in?"
              value={this.state.collisions}
              onChange={onChange}
              required={false}
            />
            <button
              className={
                (model && make && year && numberOfOwners && initialValue)
                  ? 'fit'
                  : 'disabled fit'
              }
              onClick={handleSubmit}
              type="submit"
              disabled={
                !(this.state.model && this.state.make && this.state.year
                  && this.state.numberOfOwners && this.state.initialValue)
              }

            >
              <p>Calculate Value</p>
            </button>
            <h2 className="finalValue">
              {
                this.state.finalValue > 0
                  ? `The deprecated value of your car is $${finalValue}`
                  : null
              }
              {
                (this.state.error === '')
                  ? null
                  : error
              }
            </h2>
          </Form>
        </div>
      );
    }
}
Main.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  formName: PropTypes.string.isRequired
};
export default Main;
