import React, { useState, useEffect } from "react";
import {Button, Dropdown, DropdownButton, InputGroup, Container, Card, Col, Row} from "react-bootstrap"
import { useQuery } from "react-query"
import { API } from "../config/api"
import { useNavigate, Link } from "react-router-dom"

export default function Provinsi(){
    let navigate = useNavigate();

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

    function goToAddProv (){
        navigate("/add-provinsi")
    }
    function goToAddKab(){
        navigate("/add-kabupaten")
    }

    function goToDetail(){
        navigate("/detail")
    }
    function goToTable(){
        navigate("/table-provinsi")
    }
    return(
        <div>
            <div style={{marginLeft:"4em", marginTop:"1.5em"}} className="d-flex flex-row">
                <h1 >Provinsi & Kabupaten</h1>
                <Button variant="primary" style={{marginLeft: "30em", marginTop:"1.5em", marginRight:"1em"}} onClick={goToAddProv}>Add Provinsi</Button>
                <Button variant="primary" style={{marginTop:"1.5em"}} onClick={goToAddKab}>Add Kabupaten</Button>
            </div>
            <InputGroup className="mb-3 ms-5">
                <DropdownButton
                variant="outline-secondary"
                title="Dropdown"
                id="input-group-dropdown-1"
                >
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Item href="#">Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Separated link</Dropdown.Item>
                </DropdownButton>
            
            </InputGroup>
            <Container>
                <Row>
                {provinsi?.map((item, index) => (
                <Col>
                <Link to={`/detail/` + item.id} style={{textDecoration:"none"}}>
                <Card style={{ width: '18rem', marginBottom:"1.5em" }} key={index}>
                <Card.Img variant="top" src={item.image}  />
                    <Card.Body>
                        <Card.Title style={{color:"black", textAlign:"center", textDecoration: "none" }}>{item.nama}</Card.Title>
                        <Card.Text >
                            <h5 style={{textAlign: "center", color:"black"}}>{item.diresmikan}</h5>
                        </Card.Text>
                        
                            <div className="d-grid gap-2">
                                <Button variant="primary" size="lg" onClick={goToDetail}>
                                    Detail
                                </Button>
                            </div>
                    </Card.Body>
                </Card>
                </Link>
                </Col>
                ))}
                </Row>
                <Button variant="primary" onClick={goToTable} style={{marginTop:"1.5em"}}>Provinsi</Button>
            </Container>
        </div>
    )
}