import Button from '../../button/button';

function ActionableButtons() {
  const handleClick = () => console.log('it works');
  return (
    <div className="demoButton">
      <Button variant="primary--regresar" icon="https://resources.virtuales.io/eventos/img/back.svg" onClick={handleClick}>
        Regresar a agenda
      </Button>
    </div>
  );
}

export default ActionableButtons;
