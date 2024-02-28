'use strict';
const JWT = require('jsonwebtoken');

const createToKenPair = async(payload, publicKey, privateKey) =>{
    try {
        // Tạo access token và refresh token
        const accessToken = await JWT.sign(payload, privateKey,{
            algorithm: 'RS256',
            expiresIn: '2 days'
        });
        const refreshToken = await JWT.sign(payload, privateKey,{
            algorithm: 'RS256',
            expiresIn: '7 days'
        });

        // Xác thực access token
        const decodedAccessToken = JWT.verify(accessToken, publicKey);
        console.log('Decoded Access Token:', decodedAccessToken);

        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Error in createTokenPair:', error);
        throw error; // Đảm bảo rằng lỗi được ném lại để xử lý ở nơi gọi hàm này
    }
};

module.exports = {
    createToKenPair
};
