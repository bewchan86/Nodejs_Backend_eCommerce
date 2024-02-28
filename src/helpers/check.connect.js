'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECOND5 = 5000;


// count connections
const countConnections = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connections::  ${numConnection}`);
}

// check overload
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length; // Sửa tên hàm từ cpuUsage() thành cpus()
        const memoryUsage = process.memoryUsage().rss; // Sửa từ process.memoryUsage.rss thành process.memoryUsage().rss
        //may 5 connection
        const maxConnections = numCores * 5;

        console.log('Active connections:' +numConnection);
        console.log('Memory usage: ' + memoryUsage / 1024 / 1024 + ' MB');

        /**
         * không cần đống kết nối liên tục 
         */
        if (numConnection > maxConnections) {
            console.log('Connection overloaded detected: ');
            // console.log('Too many connections, shutting down...');
            // process.exit(1);
        }
        // const count = 0; // Hoặc bạn có thể cung cấp giá trị khác tùy thuộc vào logic của ứng dụng
        // Bạn có thể thực hiện các thao tác kiểm tra quá tải ở đây sử dụng biến 'count'
    }, _SECOND5); // monitor every 5 seconds
}

module.exports = {
    countConnections,
    checkOverload
}
