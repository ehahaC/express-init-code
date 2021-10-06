"use strict";

const mongoose = require('mongoose');

const demo = new mongoose.Schema({
    any_way: { type: Number },
}, { timestamps: { createdAt: 'createAt' } });

//实例化创建规则
mongoose.model('demo', demo);
