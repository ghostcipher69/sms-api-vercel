import axios from 'axios';

export default async function handler(req, res) {
  const { receiver, message } = req.query;

  if (!receiver || !message) {
    return res.status(400).json({ error: 'Missing receiver or message' });
  }

  const token = 'a01672bb001e285a3563fd652118422866d8f97a';

  try {
    const response = await axios.post('https://sysadmin.muthobarta.com/api/v1/send-sms', {
      receiver,
      message,
      remove_duplicate: true
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    });

    res.status(200).json({ success: true, result: response.data });
  } catch (error) {
    res.status(500).json({
      error: true,
      detail: error.response ? error.response.data : error.message
    });
  }
}
