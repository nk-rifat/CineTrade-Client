import { useForm } from "react-hook-form";
import Field from "../Shared/components/Field";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosPublic from "../../api/axios";

const BecomePartnerForm = () => {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

 
  const { data: application } = useQuery({
    queryKey: ["partnerApplication"],
    queryFn: async () => {
      const res = await axiosPublic.get("/partner/my-application");
      return res.data;
    },
  });

  console.log(application);

  // 🔥 Submit application
  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      const payload = {
        fullName: formData?.fullName,
        reason: formData?.reason,
      };
      const res = await axiosPublic.post("/partner/apply", payload);
      return res.data;
    },

    onSuccess: () => {
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        text: "Your request is under review by admin.",
        confirmButtonColor: "#2563eb",
      });
      reset();
    },

    onError: (err) => {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data?.message || "Something went wrong",
        confirmButtonColor: "#dc2626",
      });
    },
  });

  const onSubmit = (data) => {
    Swal.fire({
      title: "Submitting...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Full Name" error={errors.fullName}>
          <input
            {...register("fullName")}
            defaultValue={auth?.user?.fullName}
            readOnly
            className="input-style"
          />
        </Field>

        <Field label="Email Address" error={errors.email}>
          <input
            defaultValue={auth?.user?.email}
            {...register("email")}
            readOnly
            type="email"
            className="input-style"
          />
        </Field>
      </div>

      {/* Reason */}
      <Field
        label="Why do you want to become a moderator?"
        error={errors.reason}
      >
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
      <div className="space-y-5">
        <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-[#0b0b0f] to-[#111217] p-5 shadow-lg">
          <div className="absolute inset-0 bg-amber-500/5 pointer-events-none"></div>
          <div className="text-gray-300 text-base leading-relaxed space-y-2">
            <p className="font-semibold text-amber-500 mb-2 uppercase tracking-wide">
              Distribution & Partner Agreement
            </p>
            <ul className="space-y-1">
              <li>
                <span className="text-amber-500 font-medium">
                  1. Application Fee:
                </span>{" "}
                One-time non-refundable fee of $49.99.
              </li>
              <li>
                <span className="text-amber-500 font-medium">
                  2. Content Integrity:
                </span>{" "}
                You must own full rights to uploaded content.
              </li>
              <li>
                <span className="text-amber-500 font-medium">
                  3. Revenue Share:
                </span>{" "}
                Earn 80% from approved sales.
              </li>
              <li>
                <span className="text-amber-500 font-medium">4. Approval:</span>{" "}
                Content is reviewed before publishing.
              </li>
              <li>
                <span className="text-amber-500 font-medium">
                  5. Termination:
                </span>{" "}
                Violations lead to account suspension.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3.5 px-4 bg-gradient-to-r from-sky-600 to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-sky-500/25"
      >
        Apply for Partner
      </button>
    </form>
  );
};

export default BecomePartnerForm;
