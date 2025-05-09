"use strict"
const { Schema, model } = require('mongoose');
const mongoose = require('mongoose')

const TrackBtnClicked = Schema({
    BtnId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        default: null
    },
    PageName: {
        type: String,
        require: true,
        trim: true,
        default: null
    },
    ClickCount: {
        type: Number,
        require: true,
        trim: true,
        default: 0
    }

},
    {
        timestamps: true
    },

)
const TrackBtnClicked_Model = model('TrackBtn', TrackBtnClicked);

module.exports = TrackBtnClicked_Model;