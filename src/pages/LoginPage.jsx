import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // ── LOGIN FORM STATE ──────────────────────────────────────────────────────
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    keepLoggedIn: false,
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);

  // ── SIGNUP FORM STATE ─────────────────────────────────────────────────────
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeTerms: false,
  });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [isSignupSubmitting, setIsSignupSubmitting] = useState(false);

  // ── HANDLERS ──────────────────────────────────────────────────────────────
  function handleLoginChange(e) {
    const { name, value, type, checked } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSignupChange(e) {
    const { name, value, type, checked } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleLogin(e) {
    e.preventDefault();
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      showToast("Please fill in all fields", "warning");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      showToast("Please enter a valid email address", "warning");
      return;
    }
    if (loginForm.password.length < 6) {
      showToast("Password must be at least 6 characters", "warning");
      return;
    }

    setIsLoginSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      login({
        name: loginForm.email.split("@")[0],
        email: loginForm.email,
        avatar: null,
      });
      showToast("Welcome back! You are now logged in", "success");
      setIsLoginSubmitting(false);
      navigate("/account/dashboard");
    }, 1500);
  }

  function handleSignup(e) {
    e.preventDefault();
    if (!signupForm.fullName.trim()) {
      showToast("Please enter your full name", "warning");
      return;
    }
    if (!signupForm.email.trim() || !/\S+@\S+\.\S+/.test(signupForm.email)) {
      showToast("Please enter a valid email address", "warning");
      return;
    }
    if (signupForm.password.length < 6) {
      showToast("Password must be at least 6 characters", "warning");
      return;
    }
    if (!signupForm.agreeTerms) {
      showToast("Please agree to the Terms & Conditions", "warning");
      return;
    }

    setIsSignupSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      login({
        name: signupForm.fullName,
        email: signupForm.email,
        avatar: null,
      });
      showToast(
        `Welcome to Gearbox, ${signupForm.fullName.split(" ")[0]}!`,
        "success",
      );
      setIsSignupSubmitting(false);
      navigate("/account/dashboard");
    }, 1500);
  }

  function handleSocialLogin(provider) {
    showToast(`${provider} login coming soon!`, "info");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-360 mx-auto px-15">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-[#2966DC]">
            Home
          </Link>
          <span>›</span>
          <span className="text-[#2966DC]">
            {activeTab === "login" ? "Sign In" : "Sign Up"}
          </span>
        </nav>

        {/* Card */}
        <div className="max-w-lg mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* ── Tabs ── */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-4 text-sm font-semibold transition-colors
                ${
                  activeTab === "login"
                    ? "text-[#2966DC] border-b-2 border-[#2966DC]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Log in
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-4 text-sm font-semibold transition-colors
                ${
                  activeTab === "signup"
                    ? "text-[#2966DC] border-b-2 border-[#2966DC]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Create Account
            </button>
          </div>

          <div className="p-8">
            {/* ── LOGIN FORM ── */}
            {activeTab === "login" && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 text-center mb-6">
                  Log in to your Account
                </h2>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  {/* Email */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      placeholder="Enter your email"
                      className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#2966DC]"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-gray-600">
                        Password
                      </label>
                      <button
                        type="button"
                        className="text-xs text-[#2966DC] hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        name="password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        placeholder="Enter your password"
                        className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#2966DC] pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showLoginPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Keep me logged in */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="keepLoggedIn"
                      checked={loginForm.keepLoggedIn}
                      onChange={handleLoginChange}
                      className="accent-[#2966DC]"
                    />
                    <span className="text-sm text-gray-600">
                      Keep me logged in
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoginSubmitting}
                    className="w-full bg-[#2966DC] text-white py-2.5 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoginSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "LOG IN"
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">Or Log In with</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Social login */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSocialLogin("Google")}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaGoogle className="w-4 h-4 text-red-500" />
                    Google
                  </button>
                  <button
                    onClick={() => handleSocialLogin("Facebook")}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaFacebook className="w-4 h-4 text-blue-600" />
                    Facebook
                  </button>
                </div>
              </div>
            )}

            {/* ── SIGNUP FORM ── */}
            {activeTab === "signup" && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 text-center mb-6">
                  Create your Account
                </h2>

                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={signupForm.fullName}
                      onChange={handleSignupChange}
                      placeholder="Enter your full name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#2966DC]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={signupForm.email}
                      onChange={handleSignupChange}
                      placeholder="Enter your email"
                      className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#2966DC]"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showSignupPassword ? "text" : "password"}
                        name="password"
                        value={signupForm.password}
                        onChange={handleSignupChange}
                        placeholder="Create a password"
                        className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#2966DC] pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowSignupPassword(!showSignupPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showSignupPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={signupForm.agreeTerms}
                      onChange={handleSignupChange}
                      className="accent-[#2966DC] mt-0.5"
                    />
                    <span className="text-sm text-gray-600">
                      I agree to all{" "}
                      <Link
                        to="/terms"
                        className="text-[#2966DC] hover:underline"
                      >
                        Terms & Conditions
                      </Link>
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSignupSubmitting}
                    className="w-full bg-[#2966DC] text-white py-2.5 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSignupSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "CREATE ACCOUNT"
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">Or Sign Up with</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Social signup */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSocialLogin("Google")}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaGoogle className="w-4 h-4 text-red-500" />
                    Google
                  </button>
                  <button
                    onClick={() => handleSocialLogin("Facebook")}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaFacebook className="w-4 h-4 text-blue-600" />
                    Facebook
                  </button>
                </div>

                {/* Already have account */}
                <p className="text-center text-sm text-gray-500 mt-5">
                  Already have an account?{" "}
                  <button
                    onClick={() => setActiveTab("login")}
                    className="text-[#2966DC] font-semibold hover:underline"
                  >
                    sign in
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
