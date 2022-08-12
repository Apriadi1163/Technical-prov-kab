import React, {useState} from "react";
import {Container, Form, Button, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { API } from "../config/api"
import IconPic from "../Asset/Thumbnail.png"

export default function AddProvinsi () {
    let navigate = useNavigate();
    
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({
        nama: "",
        diresmikan: "",
        image: "",
        pulau: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file"){
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();

            const formData = new FormData();
            formData.set("nama", form.nama);
            formData.set("diresmikan", form.diresmikan);
            formData.set("image", form?.image[0], form?.image[0]?.name);
            formData.set("pulau", form.pulau);

            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                }
            }

            const response = await API.post("/provinsi", formData, config)
            // console.log(response.data)
            navigate("/");
            
        }catch(error){
            console.log(error)
        }
    }
    return(
        <dev>
            <h2 style={{marginLeft:"4em", marginTop:"0.5em", marginBottom:"1em"}}>Add Provinsi</h2>
            <Container>
            {/* onSubmit={(e) => handleSubmit.mutate(e)} */}
                <Form onSubmit={handleSubmit}>
                    <div>
                        {preview && (
                            <div>
                            <img
                                src={preview}
                                style={{
                                maxWidth: '150px',
                                maxHeight: '150px',
                                objectFit: 'cover',
                                }}
                                alt={preview}
                            />
                            </div>
                        )}
                        <input
                            type="file"
                            id="upload"
                            name="image"
                            onChange={handleChange}
                            style={{marginLeft: "1.5em", marginBottom: "2em"}}
                            hidden
                        />
                        <label for="upload" className="label-form mt-2 ms-0.5">
                            Photo Film <img src={IconPic} alt=""/>
                        </label>
                    </div>
                        <InputGroup className="mb-3 mt-2">
                            <Form.Control
                                placeholder="Nama Provinsi"
                                aria-label="nama"
                                name="nama"
                                onChange={handleChange}
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>

                    <InputGroup className="mb-3">
        
                        <Form.Control
                        placeholder="Diresmikan"
                        aria-label="diresmikan"
                        name="diresmikan"
                        onChange={handleChange}
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
        
                        <Form.Control
                        placeholder="Pulau"
                        aria-label="pulau"
                        name="pulau"
                        onChange={handleChange}
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <div className="button">
                        <Button type="submit" variant="danger">
                            Add Provinsi
                        </Button>
                    </div>
                </Form>

            </Container>
        </dev>
    )
}