import mongoose from "mongoose";

const categorySchema =  mongoose.Schema({
    name : {
        type : String,
        require : true,
        unique : true,
    },
    slug : {
        type : String,
        lowercase : true,
    }
})

export default mongoose.model('Category',categorySchema)