import { useContext } from "react";
import { MoviesContext } from "../../../../providers/MoviesContext/MovieContext";
import { ReviewsSection } from "../../ReviewsSection";
import estrela from "../../../../assets/estrela.svg";
import { FormCreateReview } from "../../../FormCreateReview";
import { Modal } from "../../../Modal";

export const MoviesDetailsList = () => {
  const {
    moviesDetails,
    isOpen,
    setIsOpen,
    upDateReviews,
    handleDelete,
     } = useContext(MoviesContext);
  console.log("MoviesDetailsList", upDateReviews);

  if (!moviesDetails) {
    return <div>Carregando detalhes do filme...</div>;
  }

  const movie = moviesDetails[0];

  const averageRating =
    movie.reviews &&
    movie.reviews.length > 0 &&
    (
      movie.reviews.reduce(
        (total: any, review: { score: any }) => total + review.score,
        0
      ) / movie.reviews.length
    ).toFixed(1);

  return (
    <main>
      <section>
        <div key={movie.id}>
          <img src={movie.image} alt={movie.name} />
          <div>
            <p>{movie.type}</p>
            <span>{movie.duration}</span>
          </div>
          <div>
            <h1>{movie.name}</h1>
            <div>
              <img src={estrela} alt="avaliação dos usuários " />
              <span>{averageRating}</span>
            </div>
          </div>
          <div>
            <p>{movie.synopsis}</p>
          </div>
        </div>
      </section>
      <section>
        <div>
          <h1>AVALIAÇÕES</h1>
          
          {upDateReviews && upDateReviews.length > 0 ? (
            <section>
              <div>
                <p>{upDateReviews[0].description}</p>
                <div>
                  <img src={estrela} alt="estrela de avaliação" />
                  <span>{upDateReviews[0].score}</span>
                </div>
                <div>
                  <button
                    id={upDateReviews[0].id.toString()}
                    onClick={() => setIsOpen(true)}
                  >
                    Editar
                  </button>
                  <button
                    id={upDateReviews[0].id.toString()}
                    onClick={() => handleDelete(upDateReviews[0].id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <div>
              <button onClick={() => setIsOpen(true)}>
                <img src={estrela} alt="" /> Avaliar
              </button>
              {isOpen ? (
                <Modal>
                  <h1>Avaliação</h1>
                  <FormCreateReview />
                </Modal>
              ) : null}
            </div>
          )}
        </div>
        <ReviewsSection />
      </section>
    </main>
  );
};
