"use strict";

const mongoose = require("mongoose");

/**
 * 实例化创建规则
 */
require("./demo");

/**
 * 导出模型
 */
exports.chatLog = mongoose.model("demo");
