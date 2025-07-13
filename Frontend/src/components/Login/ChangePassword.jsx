import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import authService from "../../backend/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";

// ✅ Schema now matches fields and includes confirm logic
const formSchema = z
  .object({
    new_password: z.string().min(6, "Password must be at least 6 characters."),
    confirm_password: z.string().min(6, "Confirm password is required."),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const ChangePassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const changePassword = async (data) => {
    setError("");
    console.log(data)
    try {
      const response = await authService.changePassword(data);
      
      if (response?.success) {
        navigate("/login");
      } else {
        setError("Failed to change password");
      }
    } catch (err) {
      setError(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(changePassword)}
            className="w-full max-w-md p-8 bg-white rounded shadow space-y-6"
          >
            <legend className="text-2xl font-semibold text-center text-gray-700">
              Change Your Password
            </legend>

            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default ChangePassword;
