const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGI2YzFmZjZlMTE5YmJmNzc3M2MxOGEiLCJpYXQiOjE2OTA3NTQyNzIsImV4cCI6MTY5MTM1OTA3Mn0.8bbKMgWk0_3AN0pdgcUnZWOvtSkEYCv_CyBkvprvbbw'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'a267cd02936cccd39f4c1b981e5e3f1e2d0da6e224664b32dbeadb3e83f1dbf1'; // вставьте сюда секретный ключ для разработки из кода

try {
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `Надо исправить.
  В продакшне используется тот же секретный ключ, что и в режиме разработки.`);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
}
