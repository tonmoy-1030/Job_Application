import React, { use } from "react";
import { useForm } from "react-hook-form";
import authService from "../../backend/auth";
import { useNavigate } from "react-router";

function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userData = await authService.changePassword(data);
      if (userData) {
        navigate("/")
        alert("Password changed successfully!");
      }
    } catch (err) {
      const message =
        err.response?.data?.error || "Something went wrong. Please try again.";
      setError("root", { type: "manual", message });
    }
  };

  const newPassword = watch("new_password");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">🔐 Change Your Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-2 rounded"
            {...register("new_password", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.new_password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.new_password.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-2 rounded"
            {...register("confirm_password", {
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        {errors.root && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
