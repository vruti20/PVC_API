const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const deliverychallan = require("./deliverychallan");

const deliverychallanitem = sequelize.define("P_deliverychallanItem", {
  serialno: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mrp: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  batchno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quotationno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expirydate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

deliverychallan.hasMany(deliverychallanitem, {
  foreignKey: "deliverychallanId", onDelete:'CASCADE',as:'items'
});
deliverychallanitem.belongsTo(deliverychallan, {
  foreignKey: "deliverychallanId", onDelete:'CASCADE', as:'items'
});

module.exports = deliverychallanitem;
