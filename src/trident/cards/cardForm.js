import React from 'react';
import { DropDown, Checkboxes, InputNumber, InputText } from '../form/formElements';


export const CardForm = ({card, onChange, submit, message}) => {
  return(
    <div style={{ color:"#ffffff", backgroundColor: "#dddddd", width: "400px" }}>
      <div>
        {/* <Form inline> */}
          <InputText id="url" placeholder="Url of Image" onChange={(e) => onChange(e)} card={card}/>
          <InputText id="name" placeholder="Name of Card" onChange={(e) => onChange(e)} card={card}/>
        {/* </Form> */}
      </div>
      
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

      <div>
        <Checkboxes id="armorSlots" title="Armor Slots" arr={[0, 1, 2, 3]} onChange={(e) => onChange(e)}/>
        <Checkboxes id="weaponSlots" title="Weapon Slots" arr={[0, 1, 2, 3]} onChange={(e) => onChange(e)}/>
      </div>
      <div>
        <DropDown name="test" values={[1, 2, 3]}/>
      </div>

      <button type="submit" onClick={() => submit()}>Submit</button>
      <label>{message}</label>
    </div>
  );
}

export default CardForm;