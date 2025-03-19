import { useState } from "react";
import { useDispatch } from "react-redux";
import { register, login } from "../State/Auth/Action";
import { useNavigate } from "react-router-dom";

export default function Login({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin((prev) => !prev);
      setIsAnimating(false);
      setFormData({ username: "", email: "", password: "" }); // Reset form data on toggle
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(formData, navigate));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(formData, navigate));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative w-[800px] h-[500px] bg-black shadow-lg rounded-3xl overflow-hidden border border-gray-700">
        {/* Green Panel */}
        <div
          className={`absolute top-0 h-full bg-green-400 bg-opacity-60 backdrop-blur-lg text-black flex flex-col items-center justify-center transition-all duration-1000 z-10 ${
            isAnimating
              ? "w-full"
              : isLogin
              ? "w-1/2 translate-x-full rounded-l-[120px]"
              : "w-1/2 translate-x-0 rounded-r-[120px]"
          }`}
        >
          {isAnimating ? null : isLogin ? (
            <>
              <h2 className="text-3xl font-bold mb-2">Hello, Welcome!</h2>
              <p className="mb-4">Don't have an account?</p>
              <button
                onClick={handleToggle}
                className="px-6 py-2 border border-black rounded-lg font-semibold hover:bg-black hover:text-green-400 transition"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
              <p className="mb-4">Already have an account?</p>
              <button
                onClick={handleToggle}
                className="px-6 py-2 border border-black rounded-lg font-semibold hover:bg-black hover:text-green-400 transition"
              >
                Login
              </button>
            </>
          )}
        </div>

        {/* Form Panel */}
        <div
          className={`absolute top-0 h-full bg-black flex flex-col justify-center items-center transition-transform duration-1000 z-0 ${
            isLogin ? "translate-x-0 rounded-r-3xl" : "translate-x-full rounded-l-3xl"
          }`}
          style={{
            width: isAnimating ? "0" : "50%",
            opacity: isAnimating ? 0 : 1,
            transition: "width 1s, opacity 1s",
          }}
        >
          {isLogin ? (
            <form onSubmit={handleLogin} className="w-3/4">
              <h2 className="text-2xl font-bold mb-6 text-green-400 text-center">
                Login
              </h2>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg text-white focus:outline-none transition duration-200 hover:border-green-400 focus:border-green-400"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg text-white focus:outline-none transition duration-200 hover:border-green-400 focus:border-green-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-400 text-black py-3 rounded-lg font-semibold hover:bg-green-500 transition"
              >
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="w-3/4">
              <h2 className="text-2xl font-bold mb-6 text-green-400 text-center">
                Register
              </h2>
              <div className="mb-4">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg text-white focus:outline-none transition duration-200 hover:border-green-400 focus:border-green-400"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg text-white focus:outline-none transition duration-200 hover:border-green-400 focus:border-green-400"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg text-white focus:outline-none transition duration-200 hover:border-green-400 focus:border-green-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-400 text-black py-3 rounded-lg font-semibold hover:bg-green-500 transition"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-black text-green-400 w-10 h-10 rounded-full flex items-center justify-center border border-green-400 transition-transform duration-200 transform hover:scale-110"
      >
        ✕
      </button>
    </div>
  );
}
