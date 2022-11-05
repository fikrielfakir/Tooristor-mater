import React from "react"
import ItemProduct from "../../components/UI DASHBORD/ItemProduct"
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCTS } from "../../../../components/GraphQL/products.graphql";
import { ButtonToolbar, Button, Placeholder } from 'rsuite';
import { DELETE_PRODUCT } from "components/GraphQL/Mutations";
import AddProduct from "./AddProduct"
import { Drawer, Modal, Loader} from 'rsuite';
import EditProducts from "./EditProduct"
import { useTranslation } from 'react-i18next';


const Products = () => {
    const {t} = useTranslation();
    const [edit, setEdit] = React.useState(false);
    const [view, setview] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const [modalContent, setModalContent] = React.useState();
    const [newForm, setNewForm] = React.useState();
    const [name, setName] = React.useState();
    console.log(name)


    const { data: productdata, loading: ProductLoading, error: producterro } = useQuery(GET_PRODUCTS, {
        variables: { first: 10 }
    }); 
    const [deleteProduct] = useMutation(DELETE_PRODUCT);
    if (ProductLoading) return  <Loader size="lg" />;
    if (producterro) return `Error! ${producterro.message}`;

    let listProducts;
    if (!ProductLoading && !producterro) {
        listProducts = productdata.products.data;
    }
    // const modalUpdate = (event) => {
    //     setModalContent({ ...modalContent, [event.target.name]: event.target.value })
    //     console.log('id type',event.target.value);
    //   }

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
    const handleview = key => {
        setview(true);
        setPlacement(key);
      };

      const setshow = (e, index) => {
        e.persist()
        console.log(e)
        setModalContent({ ...listProducts[index] })
        handleview('right');
      } 
      
    const handledeleteProduct = async (clickID) => {
        try {
            const deleteMutation = await deleteProduct({
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
                        <div className="d-flex align-items-start flex-wrap me-2 headAdd"><div className="text-dark fw-bolder my-1 fs-2">{t("products")}</div> <button className="addNew" onClick={() => handleOpen('right')}>{t("Add_New")}</button></div>
                        <div className="d-flex align-items-center flex-nowrap text-nowrap py-1"></div>
                    </div>
                    {/* <div className="FiltreProduct"><input className="checkbox" type="checkbox" /><select className="FiltreOption"><i></i>
                        <option>Filters</option>
                    </select></div> */}
                </div>
                <table >
                    <thead>
                        <tr>

                            <th>{t("Profile")}</th>
                            <th>{t("name")}</th>
                            <th>{t("price")}</th>
                            <th>{t("Added_at")}</th>
                            {/* <th>Impressions</th> */}
                            <th>{t("Actions")}</th>
                        </tr>
                    </thead>
                    {listProducts.map((product, index) => {
                        return (
                            <ItemProduct
                                index={index}
                                inStock={product.in_stock}
                                key={product.id}
                                IMG={product?.image.original}
                                Title={product?.name}
                                prix={product?.price}
                                date={product?.created_at?.split(" ")[0]}
                                onDrop={(e) => deleteAlert(e, product.id)}
                                onView={(e) => setshow(e, index)}
                                onClickedit={(e) => setContent(e, index)}
                                View="3458 Views" />
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
                        <AddProduct
                            onClick={() => setOpen(false)}
                        />
                    </Drawer.Body>

                </Drawer></>
            <>
                <Drawer size="md" placement={placement} open={edit} onClose={() => setEdit(false)}>
                    <Drawer.Header>
                        <Drawer.Title>{t("Eddit")} {t("product")}</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <EditProducts
                        modle={modalContent}
                        // modalUpdate={modalUpdate}
                        URL={modalContent?.image.original}
                        valueName={modalContent?.name}
                        valuedescription={modalContent?.description}
                        valueprice={modalContent?.price}
                        valueunit={modalContent?.unit}
                        valuecity={modalContent?.city}
                        valueShopId={modalContent?.shop}
                        typeId={modalContent?.type}
                        categories={modalContent?.categories.map(i =>{
                            return(i.id)  }) }
                        />
                    </Drawer.Body>

                </Drawer>
            </>
            <>
        <Drawer size="md" placement={placement} open={view} onClose={() => setview(false)}>
          <Drawer.Header>
            <Drawer.Title>{modalContent?.name}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <div className="viewdside">
              <div className="Profile logo">
              <img className="logoProfile" src={modalContent?.image.original} />
              </div>
              <ul className="list_info">
                <li className="li_content">Price :{modalContent?.pice}</li>
                <li className="li_content">Max price :{modalContent?.max_price} DH</li>
                <li className="li_content">Min price :{modalContent?.min_price} DH</li>
                <br/>
                <li className="li_content">Project :{modalContent?.type.name}</li>
                <li className="li_content">Shop :{modalContent?.shop.name}</li>
                <li className="li_content">Category :{modalContent?.categories.map(i => {
                  return ("-" + i.name)
                })}</li>
                <li className="li_content">Tags :{modalContent?.tags.map(i => {
                  return ("-" + i.name)
                })}</li>
              </ul>
              <h6>Description :</h6>
              <p className="Pdescription">
                {modalContent?.description}
              </p>

              <></>
            </div>
          </Drawer.Body>

        </Drawer></>
        </>

    )

}

export default Products
