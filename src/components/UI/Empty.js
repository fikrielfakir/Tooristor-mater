
import Emty from "./empty.svg"
import { useTranslation } from 'react-i18next'
const Empty = () => {
     const { t } = useTranslation();
return (
    <div className="Empty empty">
        <img src={Emty}/>
        <div className="no-result">
        <h6>{t("No_products")}</h6>
        <li>{t("Check_the_spelling")}</li>
        <li>{t("Try_other_words.")}</li>
        <li>{t("Use_more_general_keywords")}</li>
        <li>{t("Specify_fewer_words")}</li>
        </div>
    </div>
)

};
export default Empty