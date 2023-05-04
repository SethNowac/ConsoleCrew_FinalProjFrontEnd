import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * Component that displays two panes side by side.
 * @component
 * @param {Object} props - The props object.
 * @param {ReactNode} props.leftPane - The component to be displayed in the left pane.
 * @param {ReactNode} props.rightPane - The component to be displayed in the right pane.
 * @returns {JSX.Element} - A JSX Element representing the TwoPanes component.
 */
function TwoPanes({ leftPane, rightPane }) {
  return (
    <Container>
      <Row>
        <Col sm={4}>{leftPane}</Col>
        <Col sm={8}>{rightPane}</Col>
      </Row>
    </Container>
  );
}
export default TwoPanes;
