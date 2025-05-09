"use strict"
const { Schema, model } = require('mongoose');
const mongoose = require('mongoose')

const SupportTicketModel = Schema({
    UserId: {
        userId: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    TicketId: {
        type: String,
        require: true,
        default: null
    },
    Issue: {
        type: String,
        require: true,
        default: null

    },
    CreateDate: {
        type: Date,
        require: true,
        defult: null
    },
    DueDate: {
        type: Date,
        require: true,
        default: null
    },
    Priority: {
        type: String,
        require: true,
        enum: ['High', "Moderate", "Low"]
    },
    Status: {
        type: String,
        enum: ['1', '0'],
        default: '0'
    }
},
    {
        timestamps: true
    },

)
const SupportTicket_Model = model('SupportTicket', SupportTicketModel);

module.exports = SupportTicket_Model;