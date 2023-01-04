const express = require("express");
const app = express();
const members = require("./members");
const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.status(200).json({members: members});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));