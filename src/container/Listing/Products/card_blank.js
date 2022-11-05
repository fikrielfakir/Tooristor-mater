import React from 'react';
import {Link} from 'react-router-dom';
import { DETAIL_POSTS_PAGE } from 'settings/constantClient';

// Import everything needed to use the `useQuery` hook
import './card.css';

function Card(props) {
    const redirect = () => {
        window.open(props?.slug, '_blank', 'noopener,noreferrer');
      };
    return (
        <>
            <div className="card" key={props.key}><div className="card-grid">
                <div className="card-img">
                    {/* <Link to={`${props.url}/${props.id}`}> */}
                <img src={props.img} alt=""  onClick={redirect} className={"thumble-img " + props.loadingimg}></img>
                {/* </Link> */}
                </div>
                <div className="card-info">
               <div className="title-prix">
                <div className={"title " +props.loadingtitle}>{props.name}</div>
                <div className={"prix " + props.loadingprix}>{props.prix}{props.unit}</div>
               </div>
               <span className="cat">{props.cat}</span>
               <span className={"desc " + props.loadingdesc}>{props.desc}</span>
               <button className={"cardBTN " + props.stat}>{props.shops}</button>
               {/* <Link to={`${props.url}/${props.id}`}> */}
               <button className="cardBTN line" onClick={redirect}>See products</button>
               {/* </Link> */}
                </div>
            </div>
            </div>
        </>
    );
}

export default Card;