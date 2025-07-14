import cloudImages from "../../assets";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordWarning, setPasswordWarning] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [mail, setMail] = useState<string>("");
    const [mailWarning, setMailWarning] = useState<string>("");



    const navigate = useNavigate();

    const handleLoginData = () => {
        let valid = true;


        // Validate Password
        if (password.trim().length < 8) {
            setPasswordWarning("Password should be at least 8 characters long.");
            valid = false;
        } else {
            setPasswordWarning("");
        }

        // If all inputs are valid, show success alert
        if (valid) {
            setMail("");
            setPassword("");
            navigate("/");
        }

    };

    //  Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    useEffect(() => {
        if (rememberMe) {
            localStorage.setItem("rememberedUser", JSON.stringify({ mail }));
        } else {
            localStorage.removeItem("rememberedUser");
        }
    }, [rememberMe, mail]);




    return (
        <div className="min-h-screen flex justify-center items-center md:bg-[#cadfd0]">
            <div className="md:w-1/2 md:rounded-xl md:bg-[#FFFFFF]">
                <div className="flex flex-col items-center justify-center text-center py-10 md:m-auto lg:w-2/3 xl:w-1/2">
                    <h1 className="text-3xl text-green-600 font-bold mb-3"><span className="text-[#1E3A8A]">Sprint</span><span className="text-[#F97316]">Scope</span></h1>
                    <p className="mb-6 text-gray-500 text-lg font-medium">Log in to your Account</p>
                    <form onSubmit={(e) => { e.preventDefault(); handleLoginData() }} className="w-full p-4 bg-white">
                        <div className="text-left mb-5">
                            <label htmlFor="mail" className="text-sm">
                                Email
                            </label>
                            <input type="email"
                                id="mail"
                                value={mail}
                                placeholder="Your Email"
                                required
                                onChange={(e) => setMail(e.target.value)}
                                onFocus={() => setMailWarning("")}
                                className={`w-full placeholder:text-gray-500 px-3 py-2 border text-sm rounded-md focus:outline-none ${mailWarning ? "border-red-500" : "border-gray-300"}`}
                            />
                            {mailWarning && <p className="text-red-500 text-xs mt-1">{mailWarning}</p>}
                        </div>
                        <div className="text-left mb-2">
                            <label htmlFor="password" className="text-sm">
                                Password
                            </label>
                            <div className={`flex items-center justify-center border rounded-md border-gray-300 ${passwordWarning ? " border-red-500" : "border-gray-300"}`}>
                                <input type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    placeholder="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setPasswordWarning("")}
                                    className="w-full placeholder:text-gray-500 px-3 py-2 border text-sm rounded-md border-none focus:outline-none"
                                />
                                <div onClick={togglePasswordVisibility} className="mr-2">
                                    {showPassword ?
                                        <img src={cloudImages.seePassword} alt="see password" />
                                        :
                                        <img src={cloudImages.hidePassword} alt="hide password" />
                                    }
                                </div>
                            </div>
                            {passwordWarning && <p className="text-red-500 text-xs mt-1">{passwordWarning}</p>}
                        </div>
                        <div className="flex justify-end mb-5">
                            <button className="cursor-pointer text-sm">Forgot Password</button>
                        </div>
                        <div className="flex items-center justify-start gap-2 mb-7">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="accent-[#F97316]"
                            />
                            <label htmlFor="rememberMe" className="text-sm">
                                Remember me
                            </label>
                        </div>
                        <button
                            type="submit"
                            disabled={!mail || password.length < 8}
                            className={`w-full py-2 rounded-sm mb-5 text-white ${!mail || password.length < 8 ? "bg-gray-300 cursor-not-allowed" : "bg-[#F97316]"
                                }`}
                        >
                            Log In
                        </button>
                        <div className="flex justify-center items-center gap-2 text-sm">
                            <p>Don't have an account?</p>
                            <Link to="/signup" className="text-[#F97316]">Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>

        </div >
    );
};

export default Login;
