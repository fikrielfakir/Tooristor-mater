import React from "react";
import ItemView from "./index"


function LoaderCard() {
    const numbers = [1, 2, 3, 4, 5, 6];
    return (<>
        {numbers.map(e => {
            return (
                <>
                    <ItemView
                        loading="loading"
                    />
                </>
            );
        })}
    </>)
}
export default LoaderCard;
