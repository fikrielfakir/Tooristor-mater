import React from "react"
import ItemCategory from "../../components/UI DASHBORD/ItemCategory"
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { Drawer, Loader } from 'rsuite';
import AddCategory from "./AddCategory"
import { useTranslation } from 'react-i18next';
import EditCategory from "./EditCategory"
import { GET_CATEGORIES,DELETE_CATEGORY } from './../../../../components/GraphQL/categories.graphql';


const Products = () => {
    const {t} = useTranslation();

    const [edit, setEdit] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const [modalContent, setModalContent] = React.useState();


    const { data: Datacategories, loading: ProductLoading, error: producterro } = useQuery(GET_CATEGORIES, {
    }); 
    const [deleteCategory] = useMutation(DELETE_CATEGORY);
    if (ProductLoading) return  <Loader size="lg" />;
    if (producterro) return `Error! ${producterro.message}`;

    let listProducts;
    if (!ProductLoading && !producterro) {
        listProducts = Datacategories.categories.data;
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
        setModalContent({ ...listProducts[index] })
        handleEdit('right');
    }
    const handledeleteProduct = async (clickID) => {
        try {
            const deleteMutation = await deleteCategory({
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
                        <div className="d-flex align-items-start flex-wrap me-2 headAdd"><div className="text-dark fw-bolder my-1 fs-2">{t("Categories")}</div> <button className="addNew" onClick={() => handleOpen('right')}>{t("Add_New")}</button></div>
                        <div className="d-flex align-items-center flex-nowrap text-nowrap py-1"></div>
                    </div>
              
                </div>
                <table >
                    <thead>
                        <tr>

                            <th>#ID</th>
                            <th>{t("name")}</th>
                            <th>{t("Children")}</th>
                            <th>{t("Actions")}</th>
                        </tr>
                    </thead>
                    {listProducts.map((product, index) => {
                        return (
                            <ItemCategory
                               index={index}
                                key={product.id}
                                ID={product?.id}
                                Title={product?.name}
                                date={product?.created_at}
                                children={product?.children.map(i =>{
                                    return(<a>{i.name} - </a>)  }) }
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
                        <Drawer.Title>{t("Add_New")} {t("Category")}</Drawer.Title>
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
                        <Drawer.Title>Eddit Category</Drawer.Title>
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

export default Products
