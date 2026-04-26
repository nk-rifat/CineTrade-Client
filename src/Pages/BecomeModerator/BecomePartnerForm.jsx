import { useForm } from "react-hook-form";
import Field from "../Shared/components/Field";
import { useAuth } from "../../hooks/useAuth";
import TermsBox from "./TermsBox";

const BecomePartnerForm = ({ onSubmit, isPending }) => {
  const {user} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Full Name" error={errors.fullName}>
          <input
            {...register("fullName")}
            defaultValue={user?.fullName}
            readOnly
            className="input-style"
          />
        </Field>

        <Field label="Email Address" error={errors.email}>
          <input
            defaultValue={user?.email}
            {...register("email")}
            readOnly
            type="email"
            className="input-style"
          />
        </Field>
      </div>

      <Field label="Why do you want to become a moderator?" error={errors.reason}>
        <textarea
          {...register("reason", {
            required: "Please provide a reason",
            minLength: { value: 20, message: "Minimum 20 characters" },
          })}
          rows="4"
          placeholder="Tell us about your experience..."
          className="input-style"
        />
      </Field>

      {/* Terms */}
      <TermsBox/>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 bg-linear-to-br from-sky-600 to-indigo-700 text-white font-bold rounded-xl"
      >
        {isPending ? "Submitting..." : "Apply for Partner"}
      </button>
    </form>
  );
};

export default BecomePartnerForm;