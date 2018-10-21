import React from 'react';
import {
  Button,
  // ControlLabel,
  // Checkbox,
  FormControl,
  // HelpBlock,
  // Form,
  FormGroup,
  Radio,
} from 'react-bootstrap';


const Checkboxes = ({id, title, arr, onChange}) => {
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

const InputText = ({id, placeholder, onChange, card}) => {
  return (
    <FormControl 
      id={id}
      type="text" 
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
      value={card[id]}/>
  );
}

const InputNumber = ({id, placeholder, onChange, card, step = 1}) => {
  return (
    <FormControl 
      id={id}
      type="number" 
      placeholder={placeholder}
      min={0}
      step={step}
      onChange={(e) => onChange(e)}
      value={card[id]}/>
  );
}

export const CardForm = ({card, onChange, submit, message}) => {
  return(
    <div style={{ color:"#ffffff", backgroundColor: "#dddddd", width: "400px" }}>
      <FormGroup>
        {/* <Form inline> */}
          <InputText id="url" placeholder="Url of Image" onChange={(e) => onChange(e)} card={card}/>
          <InputText id="name" placeholder="Name of Card" onChange={(e) => onChange(e)} card={card}/>
        {/* </Form> */}
      </FormGroup>
      
      {/* <Form inline> */}
        <InputNumber id="attack" placeholder="Attack" onChange={(e) => onChange(e)} card={card} step={10}/>
        <InputNumber id="defense" placeholder="Defense" onChange={(e) => onChange(e)} card={card} step={10}/>
      {/* </Form> */}
      
      {/* <Form inline> */}
        <InputNumber id="hp" placeholder="HP Pts" onChange={(e) => onChange(e)} card={card} step={10}/>
        <InputNumber id="deploy" placeholder="Deploy Pts" onChange={(e) => onChange(e)} card={card}/>
        <InputNumber id="move" placeholder="Move Pts" onChange={(e) => onChange(e)} card={card}/>
        <InputNumber id="range" placeholder="Range of Card" onChange={(e) => onChange(e)} card={card}/>
      {/* </Form> */}

      <FormGroup>
        <Checkboxes id="armorSlots" title="Armor Slots" arr={[0, 1, 2, 3]} onChange={(e) => onChange(e)}/>
        <Checkboxes id="weaponSlots" title="Weapon Slots" arr={[0, 1, 2, 3]} onChange={(e) => onChange(e)}/>
      </FormGroup>

      <Button type="submit" onClick={() => submit()}>Submit</Button>
      <label>{message}</label>
    </div>
  );
}

export default CardForm;