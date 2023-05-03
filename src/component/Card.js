import "./Card.css";

/**
 * A component that represents a card containing an image and child elements.
 * @param {Object} props - The props object containing the following properties:
 * @param {Object} props.children - The child elements to render inside the card.
 * @param {string} props.image - The URL of the image to display on the card.
 * @returns {JSX.Element} - A JSX element representing the card.
 */
function Card({ children, image }) {
  return (
    <div className="card">
      {image && <img className="card-img" src={image} alt=""></img>}
      {children}
    </div>
  );
}

export default Card;
