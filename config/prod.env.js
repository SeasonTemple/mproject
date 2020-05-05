'use strict'
const release = "test@1.0.0";
process.env.RELEASE_VERSION = release;
module.exports = {
  NODE_ENV: '"production"',
  RELEASE_VERSION: `"${release}"`
}
