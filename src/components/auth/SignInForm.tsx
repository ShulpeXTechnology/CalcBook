import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { setToken } from "../../utils/auth";
import { API_BASE_URL } from "../../config/env";
import { Modal } from "antd";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");

  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const [forgotMobileNo, setForgotMobileNo] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNo, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotMobileNo || !newPassword) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNo: forgotMobileNo, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password reset successful");
        setForgotModalVisible(false);
        setForgotMobileNo("");
        setNewPassword("");
      } else {
        alert(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your Mobile No and password to sign in!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label>
                  Mobile No <span className="text-error-500">*</span>{" "}
                </Label>
                <Input
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  placeholder="Enter Mobile No"
                />
              </div>
              <div>
                <Label>
                  Password <span className="text-error-500">*</span>{" "}
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                    Keep me logged in
                  </span>
                </div>
                <a
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setForgotModalVisible(true);
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <div>
                <Button className="w-full" size="sm">
                  Sign in
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        title="Reset Password"
        open={forgotModalVisible}
        onCancel={() => setForgotModalVisible(false)}
        onOk={handleForgotPassword}
        okText="Reset Password"
      >
        <div className="space-y-4">
          <Input
            type={"text"}
            value={forgotMobileNo}
            onChange={(e) => setForgotMobileNo(e.target.value)}
            placeholder="Enter your Mobile No"
          />
          <Input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
      </Modal>
    </div>
  );
}
