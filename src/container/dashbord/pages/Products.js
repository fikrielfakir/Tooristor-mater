import React from "react"
import ItemProduct from "../components/UI DASHBORD/ItemProduct"
import { GET_PRODUCTS } from "components/GraphQL/products.graphql"
import { ME } from "components/GraphQL/me.graphql"
import { Drawer, ButtonToolbar, Button, Placeholder } from 'rsuite';
import { useQuery, useMutation } from "@apollo/client";

const Products = () => {

    const [edit, setEdit] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const [modalContent, setModalContent] = React.useState();

    const { data: Medata, loading: Meloading, error: meerror } = useQuery(ME, {
        variables: { first: 10 }
    }); 
    const { data: productdata, loading: ProductLoading, error: producterro } = useQuery(GET_PRODUCTS, {
        variables: { first: 10 }
    }); 
    if (ProductLoading) return "Loading...";
    if (producterro) return `Error! ${producterro.message}`;

    
    let listProducts;
    if (!ProductLoading && !producterro) {
        listProducts = productdata.products.data;
    }

    const setContent = (e, index) => {
        e.persist()
        console.log(e)
        setModalContent({ ...listProducts[index] })
        handleEdit('right');
    }

    const modalUpdate = (event) => {
        setModalContent({ ...modalContent, [event.target.name]: event.target.value })
        console.log('update---log');
      }
console.log("shop_id", Medata.me.shop_id)

    return (
        <div className="contentOverview">
            <div className="toolbar">
                <div className="container-fluid d-flex flex-stack flex-wrap flex-sm-nowrap">
                    <div className="d-flex flex-column align-items-start justify-content-center flex-wrap me-2"><div className="text-dark fw-bolder my-1 fs-2">Products</div></div>
                    <div className="d-flex align-items-center flex-nowrap text-nowrap py-1"></div>
                </div>
                <div className="FiltreProduct"><input className="checkbox" type="checkbox" /><select className="FiltreOption"><i></i>
                    <option>Filters</option>
                </select></div>
            </div>
            <table >
                <thead>
                    <tr>

                        <th>#ID</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Added Date</th>
                        <th>Impressions</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {listProducts.map((product, index) => {
                    if (product.shop_id === Medata.me.shop_id)
                        return (
                            <ItemProduct
                               index={index}
                                key={product.id}
                                ID={product?.id}
                                IMG={product?.image.original}
                                Title={product?.name}
                                prix={product?.price}
                                date={product?.created_at}
                                onClickedit={(e) => setContent(e, index)}
                                View="3458 Views" />
                        );
                    })}
            </table>
        </div>
    )
}

export default Products
