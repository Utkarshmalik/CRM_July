const { getAllUsers } = require("../Controllers/userControllers")


module.exports = function(app){

    app.get("/crm/api/v1/users", getAllUsers);

}