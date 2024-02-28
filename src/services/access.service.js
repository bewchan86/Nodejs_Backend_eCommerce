'use strict';

const shopModel = require("../models/shop.model");
const bcrypt = require('bcrypt'); // Sửa tên module bcrypt
const crypto = require('crypto');
const KeyTokenService = require("./keyToken.sevices");
const { createToKenPair } = require("../auth/authUtils");

const RoleShop ={
    SHOP:'SHOP',
    WRITER:'WRITER',
    EDITER:'EDITER',
    ADMIN:'ADMIN'
}

class AccessService {
    static signUp = async({name, email, password}) =>{
        try {
            // Step 1: kiểm tra email đã tồn tại hay chưa
            const modelShop = await shopModel.findOne({email}).lean(); // Sửa tên biến hodelShop thành modelShop và sử dụng findOne thay vì fileOne
            if(modelShop){
                return {
                    code:'xxx',
                    message: 'Email đã tồn tại',
                    status:'error'
                }
            }
            const passwordHash = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            });

            if(newShop){
                // Tạo privateKey và publicKey
                const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096 // Sửa chính tả thành modulusLength
                });

                console.log({privateKey, publicKey}); // Lưu vào collection keystore

                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey
                });
                if(!publicKeyString){
                    return {
                        code:'xxx',
                        message: 'publicKeyString đã tồn tại',
                    }
                }
                // Tạo token pair
                const tokens = await createToKenPair({userId: newShop._id, email}, publicKey, privateKey);
                console.log('Tạo token thành công:: ', tokens);

                return {
                    code: 201,
                    metadata: {
                        code: newShop,
                        tokens
                    }
                }
            }
            return {
                code: 201,
                metadata: null
            }
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;
