import { useParams } from "react-router-dom";
import Button from "../../button/button";

function ChannelForm(props) {
  const { setInCall } = props;
  const { id } = useParams()
  
  return (
    <div className="join">
      <Button
        variant="primary--regresar"
        onClick={(e) => {
          e.preventDefault();
          setInCall(true);
        }}
      >
        Join
      </Button>
    </div>
  );
}

export default ChannelForm;
