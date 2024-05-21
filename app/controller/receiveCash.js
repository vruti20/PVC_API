const C_customer = require("../models/C_customer");
const C_customerLedger = require("../models/C_customerLedger");
const C_receiveCash = require("../models/C_receiveCash");

/*=============================================================================================================
                                           Typc C API
 ============================================================================================================ */

exports.C_create_receiveCash = async (req, res) => {
  try {
    const { customerId, amount, description, date } = req.body;

    const customerData = await C_customer.findByPk(customerId);
    if (!customerData) {
      return res
        .status(404)
        .json({ status: "false", message: "Customer Not Found" });
    }

    if (description.length > 20) {
      return res.status(400).json({ status: 'false', message: 'Description Cannot Have More Then 20 Characters' })
    }
    const data = await C_receiveCash.create({
      customerId,
      amount,
      description,
      date,
    });

    await C_customerLedger.create({
      customerId,
      debitId: data.id,
      date
    })
    return res.status(200).json({
      status: "true",
      message: "Receive Cash Create Successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "false", message: "Internal Server Error" });
  }
};

exports.C_get_all_receiveCash = async (req, res) => {
  try {
    const data = await C_receiveCash.findAll({
      include: [{ model: C_customer, as: 'ReceiveCustomer' }],
      order:[['createdAt', 'DESC']]
    })
    if (data) {
      return res.status(200).json({ status: 'true', message: 'Receive Cash Data Fetch Successfully', data: data });
    } else {
      return res.status(404).json({ status: 'false', message: 'Receive Cash not found' });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "false", message: "Internal Server Error" });
  }
}

exports.C_view_receiveCash = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await C_receiveCash.findOne({ where: { id: id }, include: [{ model: C_customer, as: 'ReceiveCustomer' }] });
    if (data) {
      return res.status(200).json({ status: 'true', message: 'Receive Cash Data Fetch Successfully', data: data });
    } else {
      return res.status(404).json({ status: 'false', message: 'Receive Cash not found' });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "false", message: "Internal Server Error" });
  }
}

exports.C_update_receiveCash = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, amount, description, date } = req.body;

    const receiveId = await C_receiveCash.findByPk(id);
    if (!receiveId) {
      return res.status(404).json({ status: 'false', message: 'Receive Cash Not Found' });
    }

    await C_receiveCash.update({
      customerId,
      amount,
      description,
      date
    }, { where: { id: id } });

    await C_customerLedger.update({
      customerId,
      date
    }, { where: { debitId: id } });

    const data = await C_receiveCash.findByPk(id);

    return res.status(200).json({ status: 'true', message: 'Receive Cash Updated Successfully', data: data });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "false", message: "Internal Server Error" });
  }
}

exports.C_delete_receiveCash = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await C_receiveCash.destroy({ where: { id } });
    if (data) {
      return res.status(200).json({ status: 'true', message: 'Receive Cash Deleted Successfully' });
    } else {
      return res.status(404).json({ status: 'false', message: 'Receive Cash Not Found' });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "false", message: "Internal Server Error" });
  }
}