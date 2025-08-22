const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

const routers = require("./src/routes");
const swaggerDocs = require("./src/swagger/swagger");

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/", routers);

swaggerDocs(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
