
import Emty from "./505.svg"
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ErrorServer = () => {
    const { t } = useTranslation();
return (
    <div className="NotFund">
           <h1 className="ServerErroor">500 <p> - {t("Internal_Server_Error")}</p></h1>
        <h5 className="txtbadrequest">Sorry its not you - its us</h5>
        <br/>
        <img src={Emty}/>
        <br/>
        <Link to="/">
        <button className="backhome"><i class="fa-solid fa-chevron-left"></i>Go Back</button></Link>
    </div>
)

};
export default ErrorServer