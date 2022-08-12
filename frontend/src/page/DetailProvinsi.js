import React, {useState, useEffect} from "react";
import {Container, Row, Col, Button, Table } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import {API} from "../config/api"

export default function DetailProvinsi(){
    let navigate = useNavigate()
    function goBack(){
        navigate("/")
    }
    let { id } = useParams();
    const [Detail, setDetail] = useState([]);
    const [Detailkab, setDetailkab] = useState([])
    const getProvinsi = async () => {
        try {
          const response = await API.get("/provinsi/" + id);
          // Store product data to useState variabel
          setDetail(response.data.data);
          setDetailkab(response.data.data.kabupaten)
          console.log(response.data.data);
          console.log(response.data.data.kabupaten)
          //console.log(response);
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
        getProvinsi(id);
    }, []);

    
    return (
        <div>
            <Container>
                <Row md="8" style={{marginTop:"2em"}}>
                    <Col md="3">
                        <img src={Detail?.image} alt=""/>
                    </Col>
                    <Col md="5" >
                        <h1 >{Detail?.nama}</h1>
                        <h4 >Diresmikan Pada : {Detail?.diresmikan}</h4>
                        <p>Terletak dipulau: {Detail?.pulau}</p>
                            
                    </Col>
                </Row>
                <div>
                    <h2 style={{marginTop:"2em", marginBottom:"0.5em"}}>Kabupaten</h2>
                </div>

                {/* <Row md="8" style={{marginTop:"2em"}}>
                    {Detailkab.map((item, index) => (
                    <div key={index}>
                    <Col md="3">
                        <img src={item.image} alt=""/>
                    </Col>
                    <Col md="5" >
                        <h1 >{item?.nama}</h1>
                        <h4 >Diresmikan Pada : {item?.diresmikan}</h4>
                        <p>Terletak dipulau: {item?.pulau}</p>
                            
                    </Col>
                    </div>
                    ))}
                </Row> */}
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th className='mx-4'>No</th>
                      <th>Nama Kabupaten</th>
                      <th>Tanggal Diresmikan</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {Detailkab.map((val, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{val.nama}</td>
                      <td>{val.diresmikan}</td>
                    
                    </tr>
                    ))}
                  </tbody>
                </Table>
                
               
                
                <Button variant="danger" onClick={goBack} style={{marginTop:"2em"}}>Back</Button>
            </Container>
        </div>
    )
}