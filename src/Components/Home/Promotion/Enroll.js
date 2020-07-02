import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../../Utilities/FormField';
import { validate } from '../../../Utilities/Misc';

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
      formData: newFormData,
    });
  }

  submitForm() {}

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
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
