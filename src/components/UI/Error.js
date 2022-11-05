
import NotFund from "./notfond.svg"
import {BrowserRouter as Router, Link} from 'react-router-dom';
const Empty = () => {
return (
    <div className="NotFund">
        <h1 className="BadRequest">400</h1>
        <h5 className="txtbadrequest">You've sent bad request</h5>
        <br/>
        <img src={NotFund}/>
        <Link to="/">
        <button className="backhome"><i class="fa-solid fa-chevron-left"></i>Go Back</button></Link>
    </div>
)

};
export default Empty