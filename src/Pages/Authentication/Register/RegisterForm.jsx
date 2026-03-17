import { Link, useNavigate } from "react-router-dom";
import Field from "../../Shared/components/Field";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks/useAuth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const submitForm = async (data) => {
    const payload = {
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await registerUser(payload);

      if (res?.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You can now login!",
          timer: 1000,
          showConfirmButton: false,
        });

        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: res?.data?.message || "Please try again",
        });
      }
    } catch (err) {
      // React Hook Form server error
      setError("root.serverError", {
        type: "server",
        message:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }

    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="space-y-4 pb-10 lg:pb-[60px]"
    >
      <Field label="First Name" error={errors.firstName}>
        <input
          {...register("firstName", { required: "First Name is Required" })}
          className={`input-style ${errors.firstName ? "input-error" : ""}`}
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Enter your First Name"
        />
      </Field>
      <Field label="Last Name" error={errors.lastName}>
        <input
          {...register("lastName", { required: "Last Name is Required" })}
          className={`input-style ${errors.firstName ? "input-error" : ""}`}
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Enter your Last Name"
        />
      </Field>
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email is Required" })}
          className={`input-style ${errors.firstName ? "input-error" : ""}`}
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is Required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters ",
            },
          })}
          className={`input-style ${errors.firstName ? "input-error" : ""}`}
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
        />
      </Field>
      {errors?.root?.serverError && (
        <p className="text-red-500 text-sm">
          {errors.root.serverError.message}
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-sky-500/25 transition-all active:scale-[0.98] focus:ring-4 focus:ring-sky-500/20"
        >
          Register
        </button>
      </div>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-sky-600 hover:text-sky-500 transition-colors underline underline-offset-4"
          >
            Login Your Account
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;