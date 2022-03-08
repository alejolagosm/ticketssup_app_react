const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'Please specify a product'],
      enum: ['Phone', 'Tablet', 'Computer', 'Accesories'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description of the issue'],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'opened', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
