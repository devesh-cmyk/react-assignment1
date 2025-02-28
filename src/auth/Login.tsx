import { useEffect} from 'react'
import { PiReadCvLogoBold } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// import { useContext } from 'react';
// import Contexts from '../context/Contexts'
import {useForm, FormProvider} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import GenericInput from '../components/genericInputs/GenericInput';


const Login = () => {


    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().required('Please enter name'),
        password: yup.string().required('Password is Required')
    })

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
          email: '',
          password: '',
        },
      });



    const user = localStorage.getItem('userRegistered')??'';
    const userRegistered = JSON.parse(user);
    
    useEffect(()=>{
        const isRegistered = localStorage.getItem('isRegistered');
        if(isRegistered) toast('Successfully Registered')
    }, [localStorage])

    const onSubmit = (data: any) =>{

        if(data.email !== userRegistered.email){
            alert('Email or password does not match');
            return;
        }

        if(data.password !== userRegistered.password){
            alert('Email or password does not match');
            return;
        }
        localStorage.setItem("isLoggedIn", true);

        navigate('/');
    }

  return ( 
    <div className="h-screen flex justify-center items-center">
        <ToastContainer />
        <div className="flex flex-col items-center bg-slate-100 rounded-md shadow-md p-20 ">
            <p className='font-bold text-2xl mb-2 flex flex-col items-start text-gray-900'><PiReadCvLogoBold />Blobs</p>
            <p className='font-bold text-5xl mb-12 text-gray-900'>Login</p>
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full" action="">
                <GenericInput name='email' type='text' placeholder='Email' />
                <GenericInput name='password' type='password' placeholder='Password' />
                <button type='submit' className='mt-[50px] font-semibold text-2xl bg-[#001111] text-white py-1 rounded-md flex items-center justify-center'>Login</button>
            </form>
            </FormProvider>
            <p className='mt-2'>First time? <Link className='font-semibold text-blue-600' to='/register'>Click to register</Link></p>
        </div>
    </div>)

}

export default Login