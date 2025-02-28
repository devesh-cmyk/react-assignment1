import { useFormContext, FieldErrors } from 'react-hook-form';

const Errors = ({ name}: {name: string}) => {
  const { formState: { errors } } = useFormContext();
  
  return (
    <>
      {errors[name] && (
        <p className="font-semibold text-start text-red-600 text-sm my-1 max-w-80">
          {errors[name]?.message}
        </p>
      )}
    </>
  );
};


export default Errors