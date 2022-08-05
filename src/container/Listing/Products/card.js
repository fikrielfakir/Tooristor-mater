import React from 'react';
import {Link} from 'react-router-dom';
import { DETAIL_POSTS_PAGE } from 'settings/constantClient';

// Import everything needed to use the `useQuery` hook
import './card.css';

function Card(props) {
    return (
        <>
            <div className="card"><div className="card-grid">
                <div className="card-img">
                    <Link to={`detail/${props.id}`}>
                <img src={props.img} alt="" className="thumble-img"></img>
                </Link>
                </div>
                <div className="card-info">
               <div className="title-prix">
                <div className="title">{props.name}</div>
                <div className="prix">{props.prix}DH</div>
               </div>
               <span className="cat">{props.cat}</span>
               <span className="desc">{props.desc}</span>
               <button className={"cardBTN " + props.stat}>{props.shops}</button>
               <Link to={`detail/${props.id}`}>
               <button className="cardBTN line">See products</button>
               </Link>
                </div>
            </div>
            </div>
        </>
    );
}

export default Card;