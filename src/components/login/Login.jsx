import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { auth, db } from '../../lib/firebase'
import { collection, doc, getDocs, setDoc, where } from 'firebase/firestore'

const Login = () => {

    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })

    const [loading, setLoading] = useState(false)

    // const handleAvatar = (e) => {
    //     if (!e.target.files[0]) return
    //     setAvatar({
    //         file: e.target.files[0],
    //         url: URL.createObjectURL(e.target.files[0])
    //     })
    // }

    const handleAvatar = async (e) => {
        if (!e.target.files[0]) return;

        const file = e.target.files[0];
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", "chugli_chowk"); // Replace with your preset name

        try {
            // Upload the file to Cloudinary
            const res = await fetch("https://api.cloudinary.com/v1_1/dtwvr9cxt/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.secure_url) {
                setAvatar({
                    file,
                    url: data.secure_url, // Cloudinary URL
                });
            } else {
                toast.error("Failed to upload avatar. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading avatar:", error);
            toast.error("Error uploading avatar.");
        }
    };


    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const { email, password } = Object.fromEntries(formData)
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                if (res) {
                    toast.success("Login successful")
                }
            })
            .catch((error) => {
                if (error.code === "auth/user-not-found") {
                    toast.error("User not found")
                }
                else if (error.code === "auth/wrong-password") {
                    toast.error("Wrong password")
                }
                else {
                    toast.error(error.message)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const { username, email, password } = Object.fromEntries(formData)

        // VALIDATE INPUTS
        if (!username || !email || !password)
            return toast.warn("Please enter inputs!");
        if (!avatar.file) return toast.warn("Please upload an avatar!");

        // VALIDATE UNIQUE USERNAME
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return toast.warn("Select another username");
        }


        try {

            // Create user in auth
            const res = await createUserWithEmailAndPassword(auth, email, password)

            // Store user data in firestore database
            await setDoc(doc(db, "users", res.user.uid), {
                id: res.user.uid,
                username,
                email,
                avatar: avatar.url,
                blocked: []
            })

            // Store user chat in firestore database
            await setDoc(doc(db, "userChats", res.user.uid), {
                chats: []
            })

            if (res) {
                toast.success("Account created successfully .... You can login now")
            }
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                toast.error("Email already in use")
            }
            else if (error.code === "auth/invalid-email") {
                toast.error("Invalid email")
            }
            else if (error.code === "auth/weak-password") {
                toast.error("Weak password")
            }
            else {
                toast.error(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='login w-full h-full flex items-center justify-around text-sm'>
            <div className="signIn flex flex-col gap-3 items-center justify-center">
                <h2 className='text-2xl font-bold'>Welcome back ,</h2>
                <form action="" className='flex flex-col gap-3' onSubmit={handleLogin}>
                    <input type="email" placeholder='Email' name='email' className='p-2 bg-[#546d724f] rounded-sm border-none outline-none' />
                    <input type="password" placeholder='Password' name='password' className='p-2 bg-[#546d724f] rounded-sm border-none outline-none' />
                    <button className='bg-blue-600 rounded-sm p-2 disabled:cursor-not-allowed disabled:opacity-50 ' disabled={loading} >{loading ? "Loading" : "Sign In"}</button>
                </form>
            </div>
            <div className="seperator h-[80%] w-[1px] bg-[#546d7285]"></div>
            <div className="register flex flex-col gap-3 items-center justify-center">
                <h2 className='text-2xl font-semibold' >Create an Account</h2>
                <form action="" className='flex flex-col gap-3' onSubmit={handleRegister}>
                    <label htmlFor="file" className='flex items-center justify-between gap-2'>
                        <img src={avatar.url || "/Images/profile.jpg"} alt="" className='w-8 h-8 rounded-md object-cover cursor-pointer' />
                        <span className='cursor-pointer underline'>Upload an avatar</span>
                    </label>
                    <input type="file" name="file" id="file" className='hidden' onChange={handleAvatar} />
                    <input type="text" placeholder='Username' name='username' className='p-2 bg-[#546d724f] rounded-sm border-none outline-none' />
                    <input type="email" placeholder='Email' name='email' className='p-2 bg-[#546d724f] rounded-sm border-none outline-none' />
                    <input type="password" placeholder='Password' name='password' className='p-2 bg-[#546d724f] rounded-sm border-none outline-none' />
                    <button className='bg-blue-600 rounded-sm p-2 disabled:cursor-not-allowed disabled:opacity-50 ' disabled={loading} >{loading ? "Loading" : "Sign Up"}</button>
                </form>
            </div>
        </div>
    )
}

export default Login