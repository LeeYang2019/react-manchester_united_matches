import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = (props) => {
  const template = (
    <div
      style={{
        background: props.bck,
        fontSize: props.size,
        color: props.color,
        padding: '5px 10px',
        display: 'inline-block',
        fontFamily: 'Righteous',
        ...props.add,
      }}
    >
      {props.children}
    </div>
  );

  if (props.link) {
    return <Link to={props.linkto}>{template}</Link>;
  } else {
    return template;
  }
};

//helper method to loop through data
export const firebaseLooper = (snapshot) => {
  const data = [];

  //loop through snapshot data and push each item into data array
  snapshot.forEach((childSnapshot) => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key,
    });
  });
  return data;
};

export const reverseArray = (array) => {
  let reversedArray = [];
  //beginning at the end, return array values
  for (let i = array.length - 1; i >= 0; i--) {
    //push into reversedArray
    reversedArray.push(array[i]);
  }
  //return reversedArray
  return reversedArray;
};

export const validate = (element) => {
  let error = [true, ''];

  //check if valid email
  if (element.validation.email) {
    //check if value is valid
    const valid = /\S+@\S+\.\S+/.test(element.value);
    //if not valid, construct message making field required
    const message = `${!valid ? 'Must be a valid email' : ''}`;
    //if not valid, assign error message else keep as is
    error = !valid ? [valid, message] : error;
  }

  //check if field is empty
  if (element.validation.required) {
    //evaluates to true if element value is not blank
    const valid = element.value.trim() !== '';
    //if not valid, construct message making field required
    const message = `${!valid ? 'This field is required' : ''}`;
    //if not valid, assign error message else keep as is
    error = !valid ? [valid, message] : error;
  }
  return error;
};
