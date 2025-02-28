// import React from 'react';
import { useFormContext } from 'react-hook-form';
import Errors from '../genericErrors/Errors';

type GenericDropBoxType = {
  name: string;
  label: string;
  options: string[]; // Array of options for the select dropdown
};

const GenericDropBox = ({ name, label, options }: GenericDropBoxType) => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-semibold mt-1">{label}</label>
      <select
        {...register(name)}
        className="h-[40px] font-semibold"
        name={name}
        id={name}
      >
        <option value="">{name}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Errors name={name}/>
    </div>
  );
};

export default GenericDropBox;
