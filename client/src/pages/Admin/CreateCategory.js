import React ,{useState,useEffect}from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from 'antd'
const CreateCategory = () => {
const [categories,setCategories] = useState([]);
const [name,setName]= useState("");
const [visible,setVisible]= useState(false);
const [selected, setSelected]= useState(null);
const [updatedName, setUpdatedName]= useState("")

const handleSubmit = async(e)=>{
  e.preventDefault();
  try{
    
    const {data}= await axios.post("/api/v1/category/create-category", {name })
    if(data?.success){
      toast.success(`${name} Category created `)
      getAllACategories();
    } else{
      toast.error(data.message);
    }
  }
  catch(err){
    console.log(err);
    toast.error("Something went wrong in input form ")

  }

}





//get all categories

const getAllACategories = async()=>{
  try{

    const {data} = await axios.get("/api/v1/category/get-category")
    if(data.success){
      setCategories(data.category);
      // toast.success("Categories extracted")
    }
  }catch(err){
    console.log(err)
    toast.error("Something went wrong in getting categories")

  }

}


useEffect(()=>{
  getAllACategories();

},[])

const handleUpdate = async(e)=>{
  e.preventDefault();
  try{

    const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name:updatedName})
    if(data.success){
      toast.success(data.message)
      setSelected(null);
      setUpdatedName("")
      setVisible(false)
      getAllACategories();
    }else{
      toast.error(data.message)
    }


  }catch(err){
    console.log(err);
    toast.error("Something went wrong");
  }
}

//handle Deletion of categories
const handleDelete = async(id)=>{

  try{

    const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`, {name:updatedName})
    if(data.success){
      toast.success(`${name} is deleted`)
      getAllACategories();
      
    }else{
      toast.error(data.message)
    }


  }catch(err){
    console.log(err);
    toast.error("Something went wrong");
  }
}




  return (
    <Layout>
        <div className='container-fluid m-4 p-4'>
          
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-9 p-3 '>
                <div className='category'>
                  <h3>Manage Categories</h3>
                <div className='w-75'>
                  <div className=' w-50'>
                    <CategoryForm handleSubmit={handleSubmit} value ={name} setValue={setName}/>

                  </div>
                <table className="table w-75 ">
                  
                  <thead>
                    <tr >
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody className='tbody_css '>
                    
                      {/* <th scope="row">1</th> */}
                      {
                        categories.map((c)=>(
                          
                          <>
                          <tr className='tr_css wd-25'>
                          <td key={c._id}>{c.name}</td>
                          <td><button className='btn btn-primary ms-2' onClick={()=> {setVisible(true); setUpdatedName(c.name) ;setSelected(c)}  }>Edit</button>
                          <button className='btn btn-danger ms-2' onClick={()=>handleDelete(c._id)}>Delete</button></td>
                
                
                          </tr>
                          
                          </>
                          
                          
                          
                          
                        ))
                      }
                   
                  </tbody>
                </table>

                </div>
                <Modal onCancel={()=>setVisible(false) } visible ={visible}>
                   <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                </Modal>
               
                </div>
            </div>
          </div>
        </div>
    </Layout>
    
  )
}

export default CreateCategory