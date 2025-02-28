import { Link } from 'react-router-dom'
import { PiReadCvLogoBold } from "react-icons/pi";
import { MdOutlineDarkMode } from "react-icons/md";
import Contexts from '../context/Contexts'
import { useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    // const {isLoggedIn, setIsLoggedIn} = useContext(Contexts);

    const handleLogout = () =>{
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isRegistered');

        navigate('/login');
    }

    const user = localStorage.getItem('userRegistered')??'';
    const userRegistered = JSON.parse(user);

    const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <>
        {
            isLoggedIn?
            <div className='nav bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 flex justify-around text-gray-800 items-center font-semibold fixed 
                w-full top-0 left-0 rounded-md'>
                <div>
                    <Link className='text-2xl text-[#1a1a1a]' to='/'><PiReadCvLogoBold /><p className='font-bold text-xl  text-gray-900'>Blobs</p></Link>
                </div>
                <ul className='flex py-[20px] font-semibold ml-[120px] gap-20 text-xl'>
                    <li className='flex'><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                <div className='flex items-center gap-[40px]'>
                    <div>Welcome, {userRegistered.name}</div>
                    <button className='text-white bg-gray-900 font-normal px-4 py-1 rounded-md' onClick={handleLogout}>Log out</button>

                </div>
            </div>
            :
            <div className='nav bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 flex justify-around text-gray-800 items-center font-semibold fixed 
                w-full top-0 left-0 rounded-md'>
                <div>
                    <Link className='text-2xl text-[#1a1a1a]' to='/'><PiReadCvLogoBold /><p className='font-bold text-xl  text-gray-900'>Blobs</p></Link>
                </div>
                <ul className='flex py-[20px] font-semibold ml-[120px] gap-20 text-xl'>
                    <li className='flex'><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                <div className='flex items-center gap-[40px]'>
                    <div><button><MdOutlineDarkMode /></button></div>
                    <Link className='text-white bg-gray-900 font-normal px-4 py-1 rounded-md' to='/login'>Login</Link>
                    <Link to='/register'>Sign Up</Link>
                </div>
        </div>
        }
    </>
  )
}

export default Navbar