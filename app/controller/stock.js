const Stock = require("../models/stock");
const Product = require("../models/product");
const User = require("../models/user");
const ItemGroup = require("../models/ItemGroup");

/*=============================================================================================================
                                          Without Type C API
 ============================================================================================================ */

exports.view_all_item_stock =async (req, res) => {
    try {
        const companyId = req.user.companyId;
        const {groupId} = req.params;
        const itemGroupExists = await ItemGroup.findOne({
            where: {
                id: groupId,
                companyId: companyId
            }
        });
        if(!itemGroupExists){
            return res.status(404).json({
                status: "false",
                message: "Item Group Not Found."
            })
        }
        const itemStock =  await Stock.findAll({
            include: [{model: Product, as: "itemStock", where: {companyId: companyId, isActive: true, itemGroupId: groupId}}, {model: User, as: "stockUpdateUser", attributes: ["username"]}],
        })
        return res.status(200).json({
            status: "true",
            message: "Item stock fetch successfully",
            data: itemStock
        })
    }catch (e) {
        console.error(e);
        return res
            .status(500)
            .json({ status: "false", message: "Internal Server Error" });
    }
}

exports.view_item_stock = async (req, res) => {
    try {
        const companyId = req.user.companyId;
        const {id} = req.params;
        const itemStock =  await Stock.findOne({
            where: {
                id,
            },
            include: [{model: Product, as: "itemStock", where: {companyId: companyId, isActive: true}}, {model: User, as: "stockUpdateUser", attributes: ["username"]}],
        })
        if(!itemStock){
            return res.status(404).json({
                status: "404",
                message: "Item not found",
            })
        }
        return res.status(200).json({
            status: "true",
            message: "Item stock fetch successfully",
            data: itemStock
        })
    }catch (e) {
        console.error(e);
        return res
            .status(500)
            .json({ status: "false", message: "Internal Server Error" });
    }
}

exports.update_item_stock = async (req, res) => {
    try {
        const { id } = req.params;
        const {itemId, qty} = req.body;
        const companyId = req.user.companyId;
        const itemStockExists = await Stock.findOne({
            where: {id: id},
            include: [{model: Product, as: "itemStock", where: {companyId: companyId, isActive: true}}],
        })
        if(!itemStockExists){
            return res.status(404).json({
                status: "false",
                message: "Item stock not found",
            })
        }
        const itemExists = await Product.findOne({
            where: {id: itemId, companyId: companyId, isActive: true}
        })
        if(!itemExists){
            return res.status(404).json({
                status: "false",
                message: "Item not found",
            })
        }

        itemStockExists.productId = itemId
        itemStockExists.qty = qty
        itemStockExists.updatedBy = req.user.userId
        await itemStockExists.save();

        return res.status(200).json({
            status: "true",
            message: "Item Stock Successfully Updated.",
            data: itemStockExists
        })

    }catch (e) {
        console.error(e);
        return res
            .status(500)
            .json({ status: "false", message: "Internal Server Error" });
    }

}