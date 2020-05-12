const express = require('express')

const app = express();

const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('<h1>🤖 NodeJS team up with MSSQL</h1>');
});

app.use('/api/employees', require('./routes/api/employees'));

app.listen(PORT, () => {
    console.log(`Server started running on ${PORT}`);
});
