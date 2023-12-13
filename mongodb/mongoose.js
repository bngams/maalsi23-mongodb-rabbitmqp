import mongoose from 'mongoose';
const { Schema } = mongoose;

// mongoose.connect('mongodb://<user>:<pwd>@localhost:28117/video?authDatasource=admin');
mongoose.connect('mongodb://localhost:28117/video');

const movieSchema = new Schema({
    title: String,
    desc: String,
    cat: String,
},{
    query: {
        byCat(cat) {
            return this.where({ cat: new RegExp(cat, 'i') });
        }
    }
});

const Movie = mongoose.model('Movie', movieSchema, 'Movie');

const m = new Movie({title: "My movie from app", cat: "tv"});
// validation?
m.save().then((res) => {
    //if succeded do this block of code
    console.log('inserted movie',res)
}).catch((err) => {
    //catch error
    console.log('error',err)
});

Movie.find().byCat('cinema').then((res) => {
    //if succeded do this block of code
    console.log('movies',res)
}).catch((err) => {
    //catch error
    console.log('error',err)
});