import './Loading.css';
import { FormattedMessage } from "react-intl";

function Loading() {
    return (
        <div className="loading">
            <div className="spinner"></div>
            <h3> <FormattedMessage id="loading.loading" /></h3>
        </div>
    )
}

export default Loading
