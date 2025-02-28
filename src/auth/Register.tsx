// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import GenericInput from '../components/genericInputs/GenericInput';
import GenericDropBox from '../components/genericInputs/GenericDropBox';
import GenericImageUpload from '../components/genericInputs/GenericImageUpload';
const VALIDATE_PHONE_NUMBER = /^[6-9]\d{9}$/;
 


const Register = () => {
  const schema = yup.object().shape({
    name: yup.string().required('Username is required'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    age: yup.number().required('Age is required').min(10, 'Age should be atleast 10'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    gender: yup.string().required('Required'),
    businessType: yup.string().required('Business type is required'),  
    profileImage: yup.mixed().required('File is required')
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      businessType: '', 
      age: undefined,
      
    },
  });



  
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    localStorage.setItem('userRegistered', JSON.stringify(data));
    localStorage.setItem('isRegistered', true);
    navigate('/login');

  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center bg-slate-100 rounded-md shadow-md p-20">
        <p className="font-bold text-5xl mb-12 text-gray-900">Register</p>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
            <GenericInput name="name" placeholder="Username" type="text" classes="w-full" />
            <GenericInput name="email" placeholder="Email" type="text" classes="w-full" />
            <GenericInput name="age" placeholder="Age" type="number" classes="w-full" />
            <GenericDropBox name="gender" label="Select an option" options={['male', 'female', 'others']} />
            <GenericDropBox name="businessType" label="Select an option" options={['business', 'nonBusiness']} />
            
            {methods.watch('businessType') === 'business' && <GenericInput name="phoneNumber" placeholder="Phone" type="number" classes='w-full'/>}
            
            <GenericImageUpload name='profileImage' accept = 'image/*' placeholder='Profile Image' />
            <GenericInput name="password" placeholder="Password" type="password" classes="w-full"/>
            <GenericInput name="confirmPassword" placeholder="Confirm Password" type="password" classes="w-full"/>

            <button
              type="submit"
              className="mt-[50px] font-semibold text-2xl bg-[#001111] text-white py-1 rounded-md flex items-center justify-center"
            >
              Register
            </button>

            <p className="mt-2">
              First time?{' '}
              <Link className="font-semibold text-blue-600" to="/login">
                Click to Login
              </Link>
            </p>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Register;
