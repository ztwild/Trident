import React from 'react';
import './style.css';
import {
  // Button
  // ControlLabel,
  // Checkbox,
  // FormControl,
  // HelpBlock,
  // Form,
  FormGroup,
  Radio,
} from 'react-bootstrap';

export const DropDown = ({name, values}) => {
  return(
    <select defaultValue={null}>
      <option selected disabled value={null}>{name}</option>
      {values.map((v, i) => {return<option key={i} value={v}>{v}</option>})}
    </select>
  )
}


export const InputText = ({id, placeholder, onChange, card}) => {
  return (
    <input 
      id={id}
      type="text" 
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
      value={card[id]}/>
  );
}


export const InputNumber = ({id, placeholder, onChange, card, step = 1}) => {
  return (
    <input 
      id={id}
      type="number" 
      placeholder={placeholder}
      min={0}
      step={step}
      onChange={(e) => onChange(e)}
      value={card[id]}/>
  );
}


export const Checkboxes = ({id, title, arr, onChange}) => {
  return(
    <div>
      <label>{title}</label>
      <FormGroup id={id} onChange={(e) => onChange(e)}>
      {arr.map((e, index) => {
        return(
          <Radio key={index} name={`radio${id}`} value={e} inline>{e}</Radio>
        );
      })}
      </FormGroup>
    </div>
  );
}

