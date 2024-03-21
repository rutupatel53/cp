const path = require("path");
const mongoose = require("mongoose");
const slugify = require("slugify");
const { writeFileSync } = require("fs"); // Importing writeFileSync for synchronous file writing

const problemSchema = mongoose.Schema({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  description: { type: String, required: true },
  input: { type: String, required: true },
  output: { type: String, required: true },
});

problemSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true, strict: true });
  const inputFileDir = path.join(__dirname, "../inputs", `${this.slug}.txt`); // Adjusted file path
  writeFileSync(inputFileDir, this.input); // Synchronously write file
  this.output = this.output.trim(); // Trim output
  next();
});

problemSchema.pre("findOneAndUpdate", function (next) {
  const update = this._update;
  if (update.title) {
    this.slug = slugify(update.title, { lower: true, strict: true });
  }
  const inputFileDir = path.join(__dirname, "../inputs", `${this.slug}.txt`); // Adjusted file path
  writeFileSync(inputFileDir, update.input); // Synchronously write file
  this.output = update.output.trim(); // Trim output
  next();
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
