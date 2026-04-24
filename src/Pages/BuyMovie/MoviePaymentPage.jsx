import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Payment from "../Stripe Payment/Payment";
import PaymentForm from "../Stripe Payment/PaymentForm";
import Loading from "../../Components/Shared/Loading";
import Error from "../../Components/Shared/Error";

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
    return <Loading message="PREPARING YOUR TICKET..." fullPage={true} />;
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
