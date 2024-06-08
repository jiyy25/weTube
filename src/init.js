import "./db";
import "./models/video";
import app from "./server";

const PORT = 4000;

app.listen(PORT, () => { console.log(`server listening on port http://localhost:${PORT} !!`) });