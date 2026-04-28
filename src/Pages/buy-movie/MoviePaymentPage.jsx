import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Components/Shared/Loading";
import Error from "../../Components/Shared/Error";
import Payment from "../stripe-payment/Payment";
import PaymentForm from "../stripe-payment/PaymentForm";

const MoviePaymentPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: movie = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/movies/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading fullPage={true} />;
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto py-20">
        <Error
          message={error.message || "We couldn't retrieve the movie details."}
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <Payment>
      <PaymentForm
        type="movie"
        referenceId={id}
        amount={movie.price}
        successRedirect={`/movies/${id}`}
      />
    </Payment>
  );
};

export default MoviePaymentPage;
