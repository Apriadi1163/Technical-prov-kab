const { kabupaten, provinsi } = require("../../models")

exports.addKabupaten = async(req, res) => {
    try{
        const data = req.body;
        
        const addNewKabupaten = await kabupaten.create({
            ...data,
            image: req.file.filename,
        })
        
        let createDataKabupaten = await kabupaten.findOne({
            where:{
                id: addNewKabupaten.id,
            }, include:
                {
                    model: provinsi,
                    as : "provinsi",
                },
            
        });
        createDataKabupaten = JSON.parse(JSON.stringify(createDataKabupaten));

        res.send({
            status: "success",
            data: {
                ...createDataKabupaten,
                image: process.env.PATH_FILE + createDataKabupaten.image,
            }
        });
    }catch (error) {
        console.log(error);
        res.send({
          status: "failed",
          message: "server error",
        });
    }
};

exports.getKabupatens = async (req, res) => {
    try{
        let data = await kabupaten.findAll({
            include:{
                model: provinsi,
                as: "provinsi",
            },
        });
        createDataKabupaten = JSON.parse(JSON.stringify(data));

        createDataKabupaten = createDataKabupaten.map((item) => {
            return{
                ...item,
                image: process.env.PATH_FILE + item.image,
            };
        });

        res.send({
            status: "success",
            createDataKabupaten,
        });
        
    }catch(error){
        console.log(error);
        res.send({
            status: "failed",
            message: "server error",
        });
    }
};

exports.getKabupaten = async (req, res) => {
    try{
        const {id} = req.params;
        const data = await kabupaten.findOne({
            where:{id},
        });

        createDataKabupaten = JSON.parse(JSON.stringify(data));

        res.send({
            status: "success",
            data: {
                ...createDataKabupaten,
                image: process.env.PATH_FILE + createDataKabupaten.image,
            }
        });

        
    }catch(error){
        console.log(error);
        res.send({
            status:"failed",
            message: "server error",
        });
    }
};

exports.updateKabupaten = async (req, res) => {
    try{
        const {id} = req.params;
        const data = req.body;
        let updateKabupaten = await kabupaten.update({
            ...data,
            image: req.file.filename,
        }, {where:{id}});

        updateKabupaten = JSON.parse(JSON.stringify(data));

        updateKabupaten = {
            ...updateKabupaten,
            image: process.env.PATH_FILE + req.file.filename,
        };

        res.status(200).send({
            status: "success",
            updateKabupaten,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            status:"failed",
            meesage:"server error",
        })
    }
}


exports.deleteKabupaten = async (req, res) => {
    try{
        const {id} = req.params;
        await kabupaten.destroy({
            where:{id},
        });

        res.send({
            status: "failed",
            message: `Delete kabupaten id: ${id} finished`,
        });
    }catch(error){
        console.log(error);
        res.send({
            status:"failed",
            message: "server error",
        })
    }
}