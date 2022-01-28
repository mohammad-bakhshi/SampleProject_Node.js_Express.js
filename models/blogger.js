const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const BloggerSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "firstname is required."],
        minlength:2,
        maxlength:30
    },
    lastname: {
        type: String,
        required: [true, "lastname is required."],
        minlength:2,
        maxlength:30
    },
    username: {
        type: String,
        required: [true, "username is required."],
        unique: [true, "username must be unique."],
        minlength:6,
        maxlength:30
    },
    password: {
        type: String,
        required: [true, "password is required."],
        unique:false,
        validate: {
            validator: function(v) {
              return /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message: props => `${props.value} is not a valid password!`
          }
    },
    gender: {
        type: String,
        enum: ['M', 'F'],
        default:'M'
    },
    cellphone: {
        type: String,
        required: [true, "cellphone number is required."]
        // validate: {
        //     validator: function(v) {
        //       return /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid cellphone!`
        //   }
    }
}, { timestamps: true });
const Blogger = mongoose.model("Blogger", BloggerSchema);
module.exports = Blogger;