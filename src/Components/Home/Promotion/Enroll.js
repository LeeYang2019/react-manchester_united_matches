import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../../Utilities/FormField';
import { validate } from '../../../Utilities/Misc';
import { firebasePromotions } from '../../../firebase';

class Enroll extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationMessage: '',
      },
    },
  };

  updateForm(element) {
    //create a copy of formData
    const newFormData = { ...this.state.formData };
    //get the element and its contents from element id
    const newElement = { ...newFormData[element.id] };
    //get target value
    newElement.value = element.event.target.value;
    //validate
    let validData = validate(newElement);
    //get valid true or false
    newElement.valid = validData[0];
    //get validation message
    newElement.validationMessage = validData[1];
    //copy newElement back to newFormData
    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData,
    });
  }

  resetFormSuccess(type) {
    //create a copu of formData
    const newFormData = { ...this.state.formData };

    //reset value, valid, validMessage
    for (let key in newFormData) {
      newFormData[key].value = '';
      newFormData[key].valid = false;
      newFormData[key].validMessage = '';
    }

    //reset state
    this.setState({
      formError: false,
      formData: newFormData,
      //if true, output 'congratulations' else 'already on db'
      formSuccess: type ? 'Congratulations!' : 'Already on Database!',
    });

    //clear formSuccess message
    this.clearSuccessMessage();
  }

  clearSuccessMessage() {
    setTimeout(() => {
      this.setState({ formSuccess: '' });
    }, 2000);
  }

  submitForm(event) {
    //prevent default behavior with onClick
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    //loop through the immediate child of formData (i.e email)
    for (let key in this.state.formData) {
      //assign this.state.formData[key].value to dataToSubmit[key]
      dataToSubmit[key] = this.state.formData[key].value;

      //true if formIsValid is true and formData[key].valid is true
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      //check to see if submittedvalue is not already in db
      firebasePromotions
        .orderByChild('email')
        .equalTo(dataToSubmit.email)
        .once('value')
        .then((snapshot) => {
          //should return null if value does not exist in db
          if (snapshot.val() === null) {
            //push submit value to db if it does not exist in db
            firebasePromotions.push(dataToSubmit);
            //reset form
            this.resetFormSuccess(true);
          } else {
            //if response is not null, value already exist
            //reset form
            this.resetFormSuccess(false);
          }
        });
    } else {
      this.setState({ formError: true });
    }
  }

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={(event) => this.submitForm(event)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormField
                id={'email'}
                formData={this.state.formData.email}
                change={(element) => this.updateForm(element)}
              />
              {this.state.formError ? (
                <div className="error_label">
                  Something is wrong, try again.
                </div>
              ) : null}
              <div className="success_label">{this.state.formSuccess}</div>
              <button onClick={(event) => this.submitForm(event)}>
                Enroll
              </button>
              <div className="enroll_disclaimer">This is a disclaimer</div>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
