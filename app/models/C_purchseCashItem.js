const { DataTypes } = require('sequelize');
const sequelize = require('../config/index');
const C_product = require('./C_product');
const C_purchaseCash = require('./C_purchaseCash');

const C_purchaseCashItem = sequelize.define('P_C_purchaseCashItem', {
    productId : {type: DataTypes.INTEGER},
    qty :{type: DataTypes.INTEGER,
        defaultValue:0
    },
    rate: {type: DataTypes.INTEGER,
        defaultValue:0
    },
    mrp: {type: DataTypes.INTEGER,
        defaultValue:0
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

C_product.hasMany(C_purchaseCashItem, {foreignKey:'productId',onDelete:'CASCADE',as:'ProductPurchase'});
C_purchaseCashItem.belongsTo(C_product, {foreignKey:'productId', onDelete:'CASCADE',as:'ProductPurchase'});

C_purchaseCash.hasMany(C_purchaseCashItem, {foreignKey:'PurchaseId', onDelete:'CASCADE', as:'items'});
C_purchaseCashItem.belongsTo(C_purchaseCash, {foreignKey:'PurchaseId', onDelete:'CASCADE', as:'items'});

module.exports = C_purchaseCashItem;