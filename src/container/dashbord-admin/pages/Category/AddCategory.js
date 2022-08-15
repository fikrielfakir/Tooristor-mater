import React, { useState } from "react";
import { CREATE_TYPE } from "../../../../components/GraphQL/Mutations";

import { useMutation ,gql} from "@apollo/client";


function AddProduct() {
  const [CreateType, { data, loading, error }] = useMutation(CREATE_TYPE);
  const [newForm, setNewForm] = useState({ name: '' });

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  if (data) return console.log(data);
  //function for handle updates on the create product form
  const formUpdate = (event) => {
    setNewForm({...newForm, [event.target.name]: event.target.value})
  }



  // creates a new product and adds it to the selected category
  const handleCreateType = async () => {
    try{
      const CreateTypeMutation = await CreateType ({
        variables:{
         "input": { name: newForm.name}  }
      })
      return CreateTypeMutation;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
          {loading ? ( <div>Loading...</div> ) : (
        <form className="input-field" onSubmit={handleCreateType}> 
            <input  className="input-name" type="text" value={newForm.name} onChange={formUpdate} name="name" placeholder="name"/>
            <button type="submit">Create</button>
        </form>)}
    
      {/* Spreadsheet Labels */}
     
    </div>
  );
}

export default AddProduct;
