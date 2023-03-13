import { app } from "./app"
import { bandRouter } from "./route/bandRouter"
import { concertRouter } from "./route/concertRouter"
import { photoRouter } from "./route/photoRouter"
import { ticketRouter } from "./route/ticketRouter"
import { userRouter } from "./route/userRouter"


app.use("/users", userRouter)
app.use("/bands", bandRouter)
app.use("/concerts", concertRouter)
app.use("/tickets", ticketRouter)
app.use("/photos", photoRouter)