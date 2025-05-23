import { TIMEOUT_SEC } from '../configs/config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (
  method,
  url,
  uploadData = undefined,
  token = undefined
) {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const fetchPro = uploadData
      ? fetch(url, {
          method: method,
          headers: headers,
          body: JSON.stringify(uploadData),
        })
      : fetch(url, { method: method, headers: headers });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    let data = null;
    const responseText = await res.text();
    if (responseText) {
      data = JSON.parse(responseText);
    }

    return { res, data };
  } catch (err) {
    console.error(`AJAX error: ${err.message}`);
    throw err;
  }
};
