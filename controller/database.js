module.exports = (mongoose) => {
    mongoose.connect('mongodb://localhost/project', {useNewUrlParser: true, useUnifiedTopology : true})
    .then(() => console.log('Bingo! Connected successfully to DB project'))
    .catch((err) => console.log('Connection to DB failed', err.message));
}