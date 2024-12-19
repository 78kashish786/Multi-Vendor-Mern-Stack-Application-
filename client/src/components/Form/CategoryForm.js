import React, { useState } from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {

    // const [value,setValue]=useState("");
  return (
    <>
    <form onSubmit={handleSubmit}>
  <div class="mb-3 category_form_input">
   
    <input type="text" class="form-control" placeholder='Enter new Category' value={value}
    onChange={(e)=>setValue(e.target.value)} />
    
  
  </div>
   <button type="submit" class="btn btn-primary">Submit</button>
  
</form>
    </>
  )
}

export default CategoryForm