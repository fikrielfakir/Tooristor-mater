import React from "react"
import ItemCategory from "../../components/UI DASHBORD/ItemCategory"
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { Drawer,Loader } from 'rsuite';
import AddCategory from "./AddCategory"
import EditCategory from "./EditCategory"
import { GET_TAGS, DELETE_TAGE } from './../../../../components/GraphQL/tags.graphql';
import { useTranslation } from 'react-i18next';


const Tag = () => {
    const {t} = useTranslation();

    const [edit, setEdit] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const [modalContent, setModalContent] = React.useState();


    const { data: DataTags, loading: TagsLoading, error: producterro } = useQuery(GET_TAGS, {
    });
    const [deleteTag] = useMutation(DELETE_TAGE);
    if (TagsLoading) return  <Loader size="lg" />;
    if (producterro) return `Error! ${producterro.message}`;

    let listTags;
    if (!TagsLoading && !producterro) {
        listTags = DataTags.tags.data;
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
        setModalContent({ ...listTags[index] })
        handleEdit('right');
    }
    const handledeleteProduct = async (clickID) => {
        try {
            const deleteMutation = await deleteTag({
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
                        <div className="d-flex align-items-start flex-wrap me-2 headAdd"><div className="text-dark fw-bolder my-1 fs-2">{t("Tags")}</div> <button className="addNew" onClick={() => handleOpen('right')}>{t("Add_New")}</button></div>
                        <div className="d-flex align-items-center flex-nowrap text-nowrap py-1"></div>
                    </div>

                </div>
                <table >
                    <thead>
                        <tr>

                            <th>#ID</th>
                            <th>{t("name")}</th>
                            <th>{t("products")}</th>
                            <th>{t("Actions")}</th>
                        </tr>
                    </thead>
                    {listTags.map((tag, index) => {
                        return (
                            <ItemCategory
                                index={index}
                                key={tag.id}
                                ID={tag?.id}
                                Title={tag?.name}
                                date={tag?.created_at}
                                children={tag?.products.map(i => {
                                    return (<a>{i.name} - </a>)
                                })}
                                onDrop={(e) => deleteAlert(e, product.id)}
                                // onClickedit={(e) => setContent(e, index)} 
                                />
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
                        <AddCategory
                            onClick={() => setOpen(false)}
                        />
                    </Drawer.Body>

                </Drawer></>
            <>
                <Drawer size="md" placement={placement} open={edit} onClose={() => setEdit(false)}>
                    <Drawer.Header>
                        <Drawer.Title>{("Eddit")} {t("Category")}</Drawer.Title>
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

}

export default Tag
