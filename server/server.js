"use strict";

const express = require('express');
const app = express();
const path = require('path');

app.get('/', (request, response) => {
   response.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(3000,'0.0.0.0', () => {
    console.log('server started on port 3000');
});