import * as React from 'react';
import { SelectPicker } from 'rsuite';
import { useTranslation } from 'react-i18next';


function City(props) {
    const { t } = useTranslation();
    console.log("data galery",props.data)
    const data = props.data?.map(
        item => ({ label: item, value: item })
      );
    return (
        <>
            <div className="FiltreTool">
                <h4 className="nametool"> <span class="icon-ic24-slider"></span>{t("Filters")}</h4>
                <SelectPicker data={data} searchable={false} style={{ width:170 }} placeholder={props.placeholder} onChange={props.OnChange}/>
                {/* <br />
                <select className="filtreItem">
                    <option>Price</option>
                </select> */}
            </div>
        </>

    );
}
export default City;