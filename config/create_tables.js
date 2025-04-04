const db = require('../models'); 

db.sequelize.sync({ alter: true }).then(() => {
  console.log("DB synced");
}).catch(err => {
  console.error("Sync error:", err);
});
