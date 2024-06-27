import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const getPasswords = async ()=>{
        let req = await fetch("http://localhost:3000")
            let passwords = await req.json();
            
                setpasswordArray(passwords);
    }
    useEffect(()=>{
        getPasswords()
    })
    


    const showPassword = (params) => {
        passwordRef.current.type = "password"

        if (ref.current.src.includes("icons/see.jpg")) {
            ref.current.src = "icons/images.png"
            passwordRef.current.type = "text";
        }
        else {
            passwordRef.current.type = "password";
            ref.current.src = "/icons/see.jpg"
        }
    }
    const savePassword = async() => {
        if(form.site.length >3 && form.username.length>3 && form.password.length>3){
        setpasswordArray([...passwordArray, {...form, id: uuidv4()}]);
        //localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
        await fetch("http://localhost:3000/",{method: "DELETE",headers:{"Content-Type": "application/json"},body: JSON.stringify({id:form.id})})
        await fetch("http://localhost:3000/",{method: "POST",headers:{"Content-Type": "application/json"},body: JSON.stringify({...form, id: uuidv4()})})
        setform({ ...form, [e.target.name]: e.target.value })
        toast('Password saved successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    else{
        toast('Enter details properly', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);
    }
    const deletePassword = async(e)=>{
        let c = confirm("Do you really want to delete this")
        if(c){
          setpasswordArray(passwordArray.filter(item=> item.id!==e))
          //localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=> item.id!==e)))
          let res = await fetch("http://localhost:3000/",{method: "DELETE",headers:{"Content-Type": "application/json"},body: JSON.stringify({e})})
          toast('Password deleted successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        }

    }
    const editPassword = (e)=>{
        setform({...passwordArray.filter(item=> item.id===e)[0],id:e})

        setpasswordArray(passwordArray.filter(item=> item.id!==e))
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            {/* Same as */}
            <ToastContainer />
            <div className="md:mycontainer p-2">
                <h1 className='text-4xl font-bold text-center'><span className='text-green-700'> &lt;</span>
                    <span>Pass</span><span className='text-green-700'>OP/&gt;</span></h1>
                <p className='text-green-700 text-xl text-center'>Your  password manager</p>
                <div className="text-white flex flex-col p-4 gap-5 items-center">
                    <input className='rounded-full text-black border border-green-600 w-full p-4 py-1' type="text" name='site' id='' placeholder='Enter website url' value={form.site} onChange={handleChange} />
                    <div className="flex gap-3 w-full justify-between">
                        <input className='rounded-full text-black border border-green-600 w-full p-4 py-1' type="text" name='username' id='' placeholder='Enetr username' value={form.username} onChange={handleChange} />
                        <div className="relative">
                            <input ref={passwordRef} className='rounded-full text-black border border-green-600 w-full p-4 py-1' type="password" name='password' id='' placeholder='Enter Password' value={form.password} onChange={handleChange} />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1 rounded-full' width={30} src="icons/see.jpg" alt="" />
                            </span>
                        </div>
                    </div>
                    <button className='flex justify-center items-centre w-fit bg-green-700 p-2 rounded-full items-center mx-auto hover:bg-green-900' onClick={savePassword}>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Add password</button>

                </div>
                <div className="pass">
                    <h1 className='font-bold'>Your Passwords</h1>
                    {passwordArray.length == 0 && <div>No passwords to show</div>}

                    {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden">
                        <thead className='bg-green-600'>
                            <tr>
                                <th className='text-justify p-2 border border-black'>Site</th>
                                <th className='text-justify p-2 border border-black'>Username</th>
                                <th className='text-justify p-2 border border-black'>Password</th>
                                <th className='text-justify p-2 border border-black'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='hover:underline flex p-4 border-y border-black'> <a href={item.site} target='_blank'> {item.site}</a>
                                        <svg className='w-6 p-1 cursor-pointer' xmlns="http://www.w3.org/2000/svg" onClick={() => { copyText(item.site) }} viewBox="0 0 24 24" width="24" height="24" color="#34A45C" fill="none">
                                            <path d="M16 2H12C9.17157 2 7.75736 2 6.87868 2.94627C6 3.89254 6 5.41554 6 8.46154V9.53846C6 12.5845 6 14.1075 6.87868 15.0537C7.75736 16 9.17157 16 12 16H16C18.8284 16 20.2426 16 21.1213 15.0537C22 14.1075 22 12.5845 22 9.53846V8.46154C22 5.41554 22 3.89254 21.1213 2.94627C20.2426 2 18.8284 2 16 2Z" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M18 16.6082C17.9879 18.9537 17.8914 20.2239 17.123 21.0525C16.2442 22 14.8298 22 12.0011 22H8.00065C5.17192 22 3.75755 22 2.87878 21.0525C2 20.1049 2 18.5799 2 15.5298V14.4515C2 11.4014 2 9.87638 2.87878 8.92885C3.52015 8.2373 4.44682 8.05047 6.00043 8" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                    </td>
                                    <td className='border border-black p-4'>{item.username}</td>
                                    <td className='border border-black p-4'>{"*".repeat(item.password.length)}</td>
                                    <td className='flex gap-4 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#34a45c" fill="none" onClick={()=>{deletePassword(item.id)}}>
                                            <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#34a45c" fill="none" onClick={()=>{editPassword(item.id)}}>
                                            <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        </svg>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                    }
                </div>

            </div>

        </>
    )
}

export default Manager
