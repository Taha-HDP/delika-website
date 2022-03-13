const joi = require("joi") ;
joi.objectID = require("joi-objectid")(joi) ;

const validateCreateItem = (data)=>{
    const schema = joi.object({
        name : joi.string().required() ,
        type : joi.string().required() ,
        class : joi.string().required() ,
        price : joi.string().required() ,
        x : joi.number(),
        y : joi.number(),
        info : joi.string(),
    }) ;
    return schema.validate(data) ;
} ;
 module.exports = {validateCreateItem} ;
