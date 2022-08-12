import {Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react";
import { API } from "../config/api"

export default function Kabupaten(){
    let navigate = useNavigate()
    const [Detail, setDetail] = useState([]);
    const getKabupaten = async () => {
        try {
          const response = await API.get("/kabupaten");
          // Store product data to useState variabel
          setDetail(response.data.data);
          console.log(response.data.data);
          //console.log(response);
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
        getKabupaten();
    }, []);
    return(
        <div>
            <Container>
                {Detail?.map((item, index) => (
                <Row md="12">
                    <Col md="5">
                        <img src={Detail?.image} alt=""/>
                    </Col>
                    <Col md="6" >
                        <h1 >{Detail?.nama}</h1>
                        <h4 >Stock: {Detail?.diresmikan}</h4>
                        <p>{Detail?.pulau}</p>
                            
                            
                        {/* <h5 className={CssDetail.price}>Rp {product?.price}</h5> */}
                        {/* <button type="submit"  >Kabupaten</button> */}
                    </Col>
                </Row>
                ))}
                
            </Container>
        </div>
    )
}