module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            countryOfOrigin: String,
            type: String,
            grapeType: String,
            year: String,
            ratings: [String]
        }
    );

    schema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Wine = mongoose.model('wines', schema);
    return Wine;
}

