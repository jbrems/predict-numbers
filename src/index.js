'use strict';

const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/learn', express.static(path.join(__dirname, 'learn')));

app.listen(3000, console.log('Server running'));
