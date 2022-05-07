const mongoose=require("mongoose");

const StateSchema=new mongoose.Schema({
    statename:{type:String}
},{timestamps:true})

module.exports=mongoose.model("State",StateSchema)

