import React from "react"
import ItemProduct from "../../components/UI DASHBORD/ItemProduct"
import { Link} from 'react-router-dom';


const Products = () => {
    return (
        <div className="content fs-6 d-flex flex-column flex-column-fluid">
            <div className="toolbar">
                <div className="container-fluid d-flex flex-stack flex-wrap flex-sm-nowrap">
                    <div className="d-flex align-items-start flex-wrap me-2 headAdd"><div className="text-dark fw-bolder my-1 fs-2">Products</div> <Link to="/admin/products/add"><button className="addNew" >Add new</button></Link></div>
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
                <ItemProduct
                ID="1"
                IMG="/images/p1.png"
                Title="Abilify 10mg"
                prix="45 DH"
                date="01 - 03 - 2019"
                View="3458 Views"
                qn="823"

                />
                <ItemProduct
                ID="2"
                IMG="/images/p2.png"
                Title="Abilify 10mg"
                prix="45 DH"
                date="01 - 03 - 2019"
                View="3458 Views"
                qn="823"

                />
                <ItemProduct
                ID="3"
                IMG="/images/p3.png"
                Title="Abilify 10mg"
                prix="45 DH"
                date="01 - 03 - 2019"
                View="3458 Views"
                qn="823"

                />
                <ItemProduct
                ID="4"
                IMG="/images/p4.png"
                Title="Abilify 10mg"
                prix="45 DH"
                date="01 - 03 - 2019"
                View="3458 Views"
                qn="823"

                />
            </table>
        </div>
    )
}

export default Products
