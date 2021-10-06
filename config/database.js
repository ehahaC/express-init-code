/**
 * mongoDb数据库地址
 */
module.exports = baseUrl =
    process.env.NODE_ENV == "development"
        ? "mongodb://root:123456@172.17.0.1:27017/address?authSource=admin"
        : "mongodb://address/database_name";

// module.exports = {
//     protocol: "mongodb",
//     identity: "root",
//     password: "123456",
//     address: process.env.NODE_ENV == "development" ? "172.17.0.1" : "address",
//     database_name: "xxxx",
//     other: process.env.NODE_ENV == "development" ? "authSource=admin" : "",
// }
