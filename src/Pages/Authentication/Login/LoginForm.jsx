import { Link, useNavigate } from "react-router-dom";
import Field from "../../Shared/components/Field";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks/useAuth";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const submitForm = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    console.log(payload);
    try {
      const res = await login(payload);
      if (res?.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          timer: 1000,
          showConfirmButton: false,
        });

        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
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
      className="space-y-4 pb-10 lg:pb-15"
    >
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email is required" })}
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
            required: "Password is required",
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
          className="w-full py-3.5 px-4 bg-linear-to-br from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-sky-500/25 transition-all active:scale-[0.98] focus:ring-4 focus:ring-sky-500/20"
        >
          Sign In to CineTrade
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-sm text-gray-200">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-sky-600 hover:text-sky-500 transition-colors underline underline-offset-4"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
