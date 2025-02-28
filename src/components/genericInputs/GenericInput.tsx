import { useFormContext } from 'react-hook-form';
import Errors from '../genericErrors/Errors';
type InputType = {
    name: string,
    type?: string,
    placeholder?: string,
    classes?: string,
}

const GenericInput = ({ name, type = 'text', placeholder, classes = '' }: InputType) => {
  const { register } = useFormContext();

  return (
    <div>
      <input
        {...register(name)}
        className={`${classes} outline-none p-2 py-2 rounded-sm`}
        type={type}
        placeholder={placeholder}
      />
      <Errors name={name}/>
    </div>
  );
};

export default GenericInput;
