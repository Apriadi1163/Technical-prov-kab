import React, {useState, useEffect} from "react";
import {Table, Container, Row, Button } from "react-bootstrap"
import { useQuery, useMutation } from "react-query"
import DeleteData from "../modal/DeleteData";
import {API} from "../config/api"
import { Navigate, useNavigate } from "react-router-dom";

export default function TableProvinsi(){
    // const [searchTerm, setSearchTerm] = useState("")
    let navigate = useNavigate()
    function gotoEdit(id){
        navigate("/edit-provinsi/" + id)
    }
    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [provinsi, setProvinsi] = useState([]);
    const getProvinsi = async () => {
        try{
            const response = await API.get("/provinsi");
            setProvinsi(response.data.data);
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getProvinsi();
    },[])   

    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };

    const deleteById = useMutation(async (id) => {
        try {
          await API.delete(`/provinsi/${id}`);
        //   refetch();
        } catch (error) {
          console.log(error);
        }
      });
    
      useEffect(() => {
        if (confirmDelete) {
          // Close modal confirm delete data
          handleClose();
          // execute delete data by id function
          deleteById.mutate(idDelete);
          setConfirmDelete(null);
        }
      }, [confirmDelete]);
    return(
        <div>
            
            <Container>
                <Row>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th className='mx-4'>No</th>
                      <th>Image</th>
                      <th>Nama Provinsi</th>
                      <th>Diresmikan</th>
                      <th>Pulau</th>
                      <th>action</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {provinsi.map((val, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                      <img
                          src={val.image}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                          }}
                          alt={val.name}
                        />
                      </td>
                      <td>{val.nama}</td>
                      <td>{val.diresmikan}</td>
                      <td>{val.pulau}</td>
                      {/* <td>{val.qty}</td> */}
                      <td>
                        <Button variant="success" className='me-4' onClick={() => {gotoEdit(val.id)}} style={{width: "135px"}} >  Edit  </Button>{' '}
                        <Button variant="danger" onClick={() => {handleDelete(val.id)}} style={{width: "135px"}}>Delete</Button>
                        
                        
                      </td>
                    
                    </tr>
                    ))}
                  </tbody>
                </Table>
                </Row>
            </Container>
            <DeleteData
              setConfirmDelete={setConfirmDelete}
              show={show}
              handleClose={handleClose}
            />
        </div>
    )
}