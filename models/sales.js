const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema({
  'Invoice ID': { type: String },
  'Branch': { type: String, enum: ['A', 'B', 'C'] },
  'City': { type: String },
  'Customer type': { type: String, enum: ['Member', 'Normal'] },
  'Gender': { type: String, enum: ['Female', 'Male'] },
  'Product line': { type: String },
  'Unit price': { type: Number },
  'Quantity': { type: Number },
  'Tax 5%': { type: Number },
  'Total': { type: Number },
  'Date':{ type: Date },
  'Time': { type: String },
  'Payment': { type: String, enum: ['Cash', 'Credit card', 'Ewallet'] },
  'cogs': { type: Number },
  'gross margin percentage': { type: Number },
  'gross income': { type: Number },
  'Rating': { type: Number }
})

module.exports = {
  Sales: mongoose.model('Sales', salesSchema)
}