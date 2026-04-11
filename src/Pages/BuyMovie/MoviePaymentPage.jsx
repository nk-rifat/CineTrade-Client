import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Payment from "../Stripe Payment/Payment";
import PaymentForm from "../Stripe Payment/PaymentForm";

const MoviePaymentPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: movie = {}, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/movies/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

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
