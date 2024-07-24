import mongoose from "mongoose"
// const mongoose = require("mongoose")

main().catch(err => console.log(err));

async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/movieApp');
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');

    console.log("Connection Open")
}

//Model
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String,
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: {
        type: [String],
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
})

//Instance Method
productSchema.method.greet = function () {
    console.log("WHATS UP MY NIGGER")
}

//Static Method
productSchema.statics.fireSale = function () {
    return this.updateMany({}, { price: 0 })
}

//Virtuals
productSchema.virtual('fullName').get(() => `${this.name} ${this.price} `)

//Mongoose middleware
productSchema.pre('save', async function () {
    console.log("Before Saving")
})
productSchema.post('save', async function () {
    console.log("After Saving")
})


const Product = mongoose.model('Product', productSchema)

const car = new Product({ name: 'GTR', price: 3999 })

Product.findOneAndUpdate({ name: 'GTR' }, { price: 10 }, { new: true, runValidators: true })
    .then(data => {
        console.log(data)
    })
    .catch(e => {
        console.log(e)
    })
















// const Movie = mongoose.model('Movie', movieSchema)

// const oldBoy = new Movie({
//     title: 'Old Boy',
//     year: 2001,
//     score: 10,
//     rating: 'R',
// })

// Movie.insertMany([
//     {
//         title: 'Old Boy1',
//         year: 2001,
//         score: 10,
//         rating: 'R',
//     },
//     {
//         title: 'Old Boy2',
//         year: 2001,
//         score: 10,
//         rating: 'R',
//     },
//     {
//         title: 'Old Boy3',
//         year: 2001,
//         score: 10,
//         rating: 'R',
//     },
//     {
//         title: 'Old Boy4',
//         year: 2001,
//         score: 10,
//         rating: 'R',
//     },
//     {
//         title: 'Old Boy5',
//         year: 2001,
//         score: 10,
//         rating: 'R',
//     },
// ])
//     .then(data => {
//         console.log("IT WORKED!")
//         console.log(data)
//     })
//     .catch(err => {
//         console.log(err)
//     })