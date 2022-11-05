import React from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { DETAIL_POSTS_PAGE } from 'settings/constantClient';

// Import everything needed to use the `useQuery` hook
import './card.css';

function Card(props) {
    const { t } = useTranslation();
    var a = (Number(props.minprice) * 100) / Number(props.maxprice);
    var b =String(100 - Number(a));
    var x = b?.split(".").slice(0, 2)
    console.log(Number(x[0]))

    // PROGRAME AUTO OPEN CLOSE 

    // initial days 
    var daysArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    // currant day :
    var day = new Date().getDay();

    //------currat today
            var dayName = daysArray[day];
            // check today
            console.log("what day ?",dayName)

    // currant time whit split
    var time = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
      }).split(":");

    //   check what time 
    console.log("what time", time)

    // convert hours to min
    if (time[0] === 0){
        time[0] = 24
    }
    var currantH = (time[0] * 60)
    var currantM = Number(time[1])
    var currantTime = currantH + currantM;

    // somme currant min 
    console.log("currant time whith min", currantTime)

    //props status time shop
    let Workhours = props.Workhours?.workhours?.[dayName][0]
    let timeshop = Workhours
    let shop = props.Workhours?.name

    // separate heur & min
    let H_FROM = timeshop?.From?.split(":")[0]
    if (H_FROM === '0'){
        H_FROM = 24
    } 

    let M_FROM = timeshop?.From?.split(":")[1]
    let H_TO = timeshop?.To?.split(":")[0]
    if (H_TO === '0'){
        H_TO = 24
    }

    let M_TO = timeshop?.To?.split(":")[1]
    console.log("workhours shop","From", H_FROM, "-", M_FROM,"TO",H_TO,"-",M_TO, shop)


    // convert hours to min
    //  FOR FROM (time open)
    if (H_FROM > H_TO){
        H_TO = 24-Number(H_FROM-H_TO)
        console.log("cas exp",H_TO)

    }
    var  T_FROM = (H_FROM *60 + Number(M_FROM))
    console.log("TOTAL FROM MIN", T_FROM ,shop)

    // FOR TO (time closed)
    var  T_TO = (H_TO *60 + Number(M_TO))
    console.log("TOTAL TO MIN", T_TO, shop)

    // syntax logic
    let status
    if (currantTime <= T_TO && currantTime >= T_FROM) { 
        status = "open"
     } 
    
    //  else if ( Number(T_TO - currantTime) <= 15){
    //     status = "CLOSED At "+ timeshop?.To
    //  }
    //  else if (Number(T_FROM - currantTime ) <= 15 ){
    //     status = "OPENING At "+ timeshop?.From
    //  }  
     else{ 
        status = "close"
     }

    return (
        <>
            <div className="card" key={props.key}><div className="card-grid">
              {props.maxprice && props.minprice && <p className="off">{ Number(x[0])}%</p>}
                <div className="card-img">
                    <Link to={`/${props.type}/${props.id}`} target={props.target}>
                <img src={props.img} alt="" className={"thumble-img " + props.loadingimg}></img>
                </Link>
                </div>
                <div className="card-info">
               <div className="title-prix">
                <div className={"title " +props.loadingtitle}>{props.name}</div>
                {props.maxprice && props.minprice?
                
                (<>
                <div className='offPrice'>
                <del className="minprice">{props.maxprice}{props.unit}</del>
                <div className={"prix off" + props.loadingprix}>{props.minprice}{props.unit}</div>
                </div>
                </>):
                ( 
                <div className={"prix " + props.loadingprix}>{props.prix}{props.unit}</div>
                )
               
                }
               </div>
               <span className="cat">{props.cat}</span>
               <span className={"desc " + props.loadingdesc}>{props.desc}</span>
               <button className={"cardBTN " + status}>
                {props.type == "shop" && t(status) || props.type == "product" && props.shops} </button>
               <Link to={`/${props.type}/${props.id}`} target={props.target}>
               <button className="cardBTN line">{t("see")} {t(props.type)}</button>
               </Link>
                </div>
            </div>
            </div>
        </>
    );
}

export default Card;