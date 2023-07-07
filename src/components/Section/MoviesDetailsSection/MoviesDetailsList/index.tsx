import { useContext } from "react";
import { MoviesContext } from "../../../../providers/MoviesContext/MovieContext";
import { ReviewsSection } from "../../ReviewsSection";
import estrela from "../../../../assets/estrela.svg";
import { FormCreateReview } from "../../../FormCreateReview";
import { Modal } from "../../../Modal";
import { FormUpdateReview } from "../../../FormUpDateReview";

export const MoviesDetailsList = () => {
  const {
    moviesDetails,
    isOpen,
    setIsOpen,
    upDateReviews,
    handleDelete,
     } = useContext(MoviesContext);
  

  if (!moviesDetails?.length) {
    return <div>Carregando detalhes do filme...</div>;
  }
  console.log(moviesDetails)

  const movie = moviesDetails[0];

  if (!movie || !movie.image) {
    return <div>Filme sem imagem disponível.</div>;
  }


  const averageRating =
  movie && movie.reviews && movie.reviews.length > 0
    ? (
        movie.reviews.reduce(
          (total: any, review: { score: any }) => total + Number(review.score),
          0
        ) / Number(movie.reviews.length)
      ).toFixed(1)
    : 0;


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
                  {isOpen ? (
                    <Modal>
                      <h2>Editar Avaliação</h2>
                      <FormUpdateReview />     
                    </Modal>
                  ) : null}

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