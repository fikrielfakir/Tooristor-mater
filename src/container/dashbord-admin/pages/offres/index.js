import React from "react"
import Itemoffre from "../../components/UI DASHBORD/itemoffre"
// import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { Drawer, ButtonToolbar, Button, Placeholder,Loader} from 'rsuite';
import Addoffre from "./Addoffre"
import EditCategory from "./EditCategory"
import { GET_COUPONS,DELETE_COUPONS } from "components/GraphQL/coupons.graphql";
import { useTranslation } from 'react-i18next';


const offres = () => {
    const {t} = useTranslation ();
    const [edit, setEdit] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const [modalContent, setModalContent] = React.useState();


    const { data: DateCoupain, loading: LoadingCoupain, error: ErrorCoupain } = useQuery(GET_COUPONS, {
        variables: {
            first:10000
        }
      });
    const [deleteCoupon] = useMutation(DELETE_COUPONS);
    if (LoadingCoupain) return  <Loader size="lg" />;
    if (ErrorCoupain) return `Error! ${ErrorCoupain.message}`;

    let listCoupain;
    if (!LoadingCoupain && !ErrorCoupain) {
        listCoupain = DateCoupain.coupons.data;
    }
    const modalUpdate = (event) => {
        setModalContent({ ...modalContent, [event.target.name]: event.target.value })
      }

    //function to confirm if user would like to delete product
    const deleteAlert = async (event, id) => {
        event.preventDefault();
        const clickID = id;
        console.log(clickID);
        let x = window.confirm("are you sure you want to delete this product?");
        if (x) {
            handledeleteProduct(clickID);
        } else {
            return
        }
    }
    const setContent = (e, index) => {
        e.persist()
        console.log(e)
        setModalContent({ ...listCoupain[index] })
        handleEdit('right');
    }
    const handledeleteProduct = async (clickID) => {
        try {
            const deleteMutation = await deleteCoupon({
                variables: { id: clickID }
            }).then(() => { window.location.reload(); });
            return deleteMutation;
        } catch (e) {
            console.log(e);
        }

    }
    const handleOpen = key => {
        setOpen(true);
        setPlacement(key);
    };
    const handleEdit = key => {
        setEdit(true);
        setPlacement(key);
    };



    return (
        <>
            <div className="contentOverview">
                <div className="toolbar">
                    <div className="container-fluid d-flex flex-stack flex-wrap flex-sm-nowrap">
                        <div className="d-flex align-items-start flex-wrap me-2 headAdd"><div className="text-dark fw-bolder my-1 fs-2">{t("offres")}</div> <button className="addNew" onClick={() => handleOpen('right')}>{t("Add_New")}</button></div>
                        <div className="d-flex align-items-center flex-nowrap text-nowrap py-1"></div>
                    </div>
              
                </div>
                <table >
                    <thead>
                        <tr>
                            <th>{t("Profile")}</th>
                            <th>{t("shop")}</th>
                            <th>{t("product")}</th>
                            <th>{t("Start")}</th>
                            <th>{t("Expired")}</th>
                            <th>{t("Actions")}</th>
                        </tr>
                    </thead>
                    {listCoupain.map((e, index) => {
                        return (
                            <Itemoffre
                                index={index}
                                IMG={e?.image.original}
                                shop={e?.shop?.name}
                                start={e?.active_from}
                                end={e?.expire_at}
                                product={e?.products?.name}
                                onDrop={(d) => deleteAlert(d, e.id)}
                                onClickedit={(e) => setContent(e, index)}/>
                        );
                    })}

                </table>

            </div>
            <>
                <Drawer size="md" placement={placement} open={open} onClose={() => setOpen(false)}>
                    <Drawer.Header>
                        <Drawer.Title>{t("Add_New")}</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <Addoffre
                            onClick={() => setOpen(false)}
                        />
                    </Drawer.Body>

                </Drawer></>
            <>
                <Drawer size="md" placement={placement} open={edit} onClose={() => setEdit(false)}>
                    <Drawer.Header>
                        <Drawer.Title>{t("Eddit")}{t("Category")}</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <EditCategory
                        modle={modalContent}
                        modalUpdate={modalUpdate}
                        name={modalContent?.name}
                        details={modalContent?.details}
                        type={modalContent?.type}
                        />
                    </Drawer.Body>

                </Drawer>
            </>
        </>

    )

};

export default offres
