
import React, { useState } from "react";
import { CREATE_SHOP  } from "../../../../components/GraphQL/Mutations";
import { useMutation } from "@apollo/client";
function AddShop() {
  const [CreateProduct, { data, loading, error }] = useMutation(CREATE_SHOP );
  const [newForm, setNewForm] = useState({ name: '', description: '', cover_image: '', logo: '', address: '', contact: '', categories: ''});
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
      const CreateTypeMutation = await CreateProduct ({
        variables:{ "input":{
          name: newForm.name,
          description:newForm.description,
      }}
      })
      return CreateTypeMutation;
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>

        <form onSubmit={handleCreateType}> 
          <input type="text" onChange={formUpdate} value={newForm.name} placeholder="Name" name="name"/>
          <input type="text" onChange={formUpdate} value={newForm.description} placeholder="Name" name="description"/>
            <button type="submit">Create</button>
        </form>
      {/* Spreadsheet Labels */}
    </div>
  );
}
export default AddShop;
