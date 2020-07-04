import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FormField from '../../Utilities/FormField';
import { validate } from '../../Utilities/Misc';

class SignIn extends Component {
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
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
      },
    },
  };

  updateForm(element) {
    //create a copy of state
    const newFormData = { ...this.state.formData };
    //get the child element from the copy
    const newElement = { ...newFormData[element.id] };
    //assign target value to child element value
    newElement.value = element.event.target.value;
    //validate element value and return with array of validations
    let validData = validate(newElement);
    //assign validations
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[element.id] = newElement;

    this.setState({ formError: false, formData: newFormData });
  }

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          //push user to dashboard
          this.props.history.push('/dashboard');
        })
        .catch((error) => {
          this.setState({ formError: true });
        });
    } else {
      this.setState({ formError: true });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="signin_wrapper" style={{ margin: '100px' }}>
          <form onSubmit={(event) => this.submitForm(event)}>
            <h2>Please Login</h2>

            <FormField
              id={'email'}
              formData={this.state.formData.email}
              change={(element) => this.updateForm(element)}
            />

            <FormField
              id={'password'}
              formData={this.state.formData.password}
              change={(element) => this.updateForm(element)}
            />

            {this.state.formError ? (
              <div className="error_label">Something is wrong, try again.</div>
            ) : null}

            <button onClick={(event) => this.submitForm(event)}>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
