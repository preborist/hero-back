const mongoose = require('mongoose');
const { Schema } = mongoose;

const heroSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, 'Set nickname for hero'],
    },
    real_name: {
      type: String,
      required: [true, 'Set name for hero'],
    },
    origin_description: {
      type: String,
    },
    superpowers: {
      type: String,
    },
    catch_phrase: {
      type: String,
    },
    images: {
      type: Array,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  },
);

const Hero = mongoose.model('hero', heroSchema);

module.exports = Hero;
