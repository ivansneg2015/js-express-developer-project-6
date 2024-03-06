#! /usr/bin/env node

import getApp from '../plugin.js';

const port = process.env.PORT || 5000;
const address = '0.0.0.0';

getApp().listen(port, address, () => {
  console.log(`Server is running on port: ${port}`);
});
