const axios = require('axios');

module.exports = async (req, res) => {
  const { receiver, message } = req.query;

  if (!receiver || !message) {
    return res.status(400).send("Missing receiver or message");
  }

  try {
    const response = await axios.post('https://sysadmin.muthobarta.com/api/v1/send-sms', {
      receiver: receiver,
      message: message,
      remove_duplicate: true
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token a01672bb001e285a3563fd652118422866d8f97a`
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).send(error.response ? error.response.data : error.message);
  }
};
