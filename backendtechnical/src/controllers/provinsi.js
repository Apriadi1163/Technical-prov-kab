const {provinsi, kabupaten} = require("../../models")

exports.addProvinsi = async(req, res) => {
    try{
        // const data = req.body;
        const data = {
            nama: req.body.nama,
            diresmikan: req.body.diresmikan,
            pulau: req.body.pulau,
            image: req.file.filename,
        };
        // if (req.file) {
        //     data.image = req.file.filename;
        // }
        const createData = await provinsi.create(data);

        let createDataProvinsi = await provinsi.findOne({
            where:{
                id: createData.id,
            },
            include:[
                {
                    model: kabupaten,
                    as: "kabupaten",
                }
            ]
        });

        createDataProvinsi = JSON.parse(JSON.stringify(createDataProvinsi));

        res.send({
            status: "success",
            data: {
                ...createDataProvinsi,
                image: process.env.PATH_FILE + createDataProvinsi.image,
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

exports.getProvinsis = async (req, res) => {
    try{
        let data = await provinsi.findAll({
            include:{
                model: kabupaten,
                as: "kabupaten",
            },
        });

        // res.send({
        //     status: "success",
        //     data,
        // })
        data = JSON.parse(JSON.stringify(data));
        
        data = data.map((item) => {
            return {
              ...item,
              image: process.env.PATH_FILE + item.image,
            };
          });
        res.send({
            status: "success",
            data,
        });
    }catch(error){
        console.log(error);
        res.send({
            status: "failed",
            message: "server error",
        });
    }
};

exports.getProvinsi = async (req, res) => {
    try{
        const {id} = req.params;
        let data = await provinsi.findOne({
            where:{id},include:{
                model: kabupaten,
                as: "kabupaten",
            },
        });

        
        data = JSON.parse(JSON.stringify(data));
        // image = process.env.PATH_FILE + data[0].image,

        res.send({
            status: 'success...',
            data:{
                ...data,
                image : process.env.PATH_FILE + data.image,
                // Newimage: process.env.PATH_FILE + dataKabupaten.image,

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

exports.updateProvinsi = async (req, res) => {
    try{
        const {id} = req.params;
        const newdata = req.body;
        let data = await provinsi.update({
            ...newdata,
            image: req.file.filename,
        }, {where:{id}});

        data = JSON.parse(JSON.stringify(newdata));

        data = {
            ...data,
            image: process.env.PATH_FILE + req.file.filename,
        };

        res.status(200).send({
            status: "success",
            data,
            
            
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            status:"failed",
            meesage:"server error",
        })
    }
}

exports.deleteProvinsi = async (req, res) => {
    try{
        const {id} = req.params;
        await provinsi.destroy({
            where:{id},
        });

        res.send({
            status: "failed",
            message: `Delete provinsi id: ${id} finished`,
        });
    }catch(error){
        console.log(error);
        res.send({
            status:"failed",
            message: "server error",
        })
    }
}