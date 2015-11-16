import mongoose from 'mongoose';

let Schema = mongoose.Schema;

var Tag = new Schema({
    title: { type: String, required: true }
});

var PostSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String, required: true },
    tags: [Tag],
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date, default: Date.now }
});

// validation
PostSchema.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

PostSchema.statics.getLatest = function (startIndex, pageSize, callback) {
  let query = this.find().sort('-created_at').skip(startIndex).limit(pageSize);
  return query.exec(callback);
};

export default mongoose.model('Post', PostSchema);
