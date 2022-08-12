import React,{ useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { API } from "../config/api"
import { useQuery, useMutation } from "react-query"

export default function EditProvinsi(){
    const navigate = useNavigate()
    const { id } = useParams();

    const [preview, setPreview] = useState(null)
    const [provinsi, setProvinsi] = useState({})
    const [form, setForm] = useState({
        image: "",
        nama: "",
        diresmikan: "",
        pulau: "",
    })

    // const getProvinsi = async (id) => {
    //     try{
    //         const response = await API.get("/provinsi/" + id);
    //         setPreview(response.data.data.image);
    //         setForm({
    //             nama: response.data.data.nama,
    //             diresmikan: response.data.data.diresmikan,
    //             pulau: response.data.data.pulau,
    //         });
    //         setProvinsi(response.data.data.getProvinsi);
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getProvinsi(id);
    // },[])

    // let {data: provinsi, refetch} = useQuery("ProvinsiCache", async () => {
    //     const response = await API.get("/provinsi/" + id);
    //     return response.data.data;
    // })
    useQuery("provinsiCache", async () => {
        const response = await API.get("/provinsi/" + id);
        setPreview(response.data.data.image);
        setForm({
            ...form,
            nama: response.data.data.nama,
            diresmikan: response.data.data.diresmikan,
            pulau: response.data.data.pulau,
        });
        setProvinsi(response.data.data)
    })
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value,
        });

        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = useMutation(async (e) => {
        try{
            e.preventDefault();

            const config = {
                headers: {
                  'Content-type': 'multipart/form-data',
                },
            };

            const formData = new FormData();
            if (form.image) {
                formData.set('image', form?.image[0], form?.image[0]?.name);
            }
            formData.set('nama', form.nama);
            formData.set('diresmikan', form.diresmikan);
            formData.set('pulau', form.pulau);

            const response = await API.patch("/provinsi/" + provinsi.id, formData, config);
            console.log(response.data.data)
            navigate("/table-provinsi")
        }catch(error){
            console.log(error);
        }
    })

    useEffect(() => {

    },[provinsi]);
   
    return(
        <div>
            <Form onSubmit={(e) => handleSubmit.mutate(e)} >
                    {preview && (
                        <div>
                        <img
                            src={preview}
                            style={{
                            marginLeft: "1.5em",
                            maxWidth: "150px",
                            maxHeight: "150px",
                            objectFit: "cover",
                            }}
                            alt="preview"
                        />
                        </div>
                    )}
                    <div>
                        <label
                        for="upload"
                        className="label-file-add-product"
                        style={{
                            backgroundColor: "red",
                            marginLeft: "2em",
                            borderRadius: "2em",
                            height: "2em",
                            color: "black",
                        }}
                        >
                        Upload file
                        <input
                            type="file"
                            id="upload"
                            name="image"
                            hidden
                            onChange={handleChange}
                        />
                        </label>
                    </div>
                <input
                    type="text"
                    placeholder="Nama Provinsi"
                    name="nama"
                    value={form?.nama}
                    onChange={handleChange}
                    // className="input-form mt-4"
                />

                <input
                    type="text"
                    placeholder="Diresmikan"
                    name="diresmikan"
                    value={form?.diresmikan}
                    onChange={handleChange}
                    // className="input-form mt-4"
                />

                <input
                    type="text"
                    placeholder="Pulau"
                    name="pulau"
                    value={form?.pulau}
                    onChange={handleChange}
                    // className="input-form mt-4"
                />

                {/* <Button variant="primary" >Update Data</Button> */}
                <button>Update data</button>
            </Form>
        </div>
    )
}