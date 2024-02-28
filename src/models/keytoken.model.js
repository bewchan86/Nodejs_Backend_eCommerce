const {Schema,model} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'
// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        require:true,
        ref: 'Shop'
    },
    publickey:{
        type:String,
        required:true,
    },
    //xu ly hacker
    refreshToken:{
        type:Array,
        default:[]
    }
},{
    collection: COLLECTION_NAME,
    Timestamps:true
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);