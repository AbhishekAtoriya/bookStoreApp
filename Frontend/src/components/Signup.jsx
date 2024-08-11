import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from 'react-hot-toast';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    axios
      .post("https://bookstoreapp-backend-9oa7.onrender.com", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success('Successfully created!');
        }
        localStorage.setItem("Users", JSON.stringify(res.data));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message); // Ensure server sends this message
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[600px]">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
            <h3 className="font-bold text-lg">Signup</h3>
            {/* Name */}
            <div className="mt-4 space-y-3">
              <span>Name</span>
              <br />
              <input
                type="text"
                placeholder="Enter your fullname"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && <p className="text-red-500">Fullname is required.</p>}
            </div>
            {/* Email */}
            <div className="mt-4 space-y-3">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-red-500">Email is required.</p>}
            </div>
            {/* Password */}
            <div className="mt-4 space-y-3">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              {errors.password && <p className="text-red-500">Password is required.</p>}
            </div>
            {/* Button */}
            <div className="flex justify-around mt-4">
              <button type="submit" className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                Signup
              </button>
              <p className="text-xl">
                Have an account?{" "}
                <Link to="/login" className="underline text-blue-500 cursor-pointer">
                  Login
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
