const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const tenantSchema = new mongoose.Schema({
  name: String,
  domain: String
});

const User = mongoose.model('User', userSchema);
const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = {User,Tenant};