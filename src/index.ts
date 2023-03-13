import { app } from "./app"
import { bandRouter } from "./route/bandRouter"
import { concertRouter } from "./route/concertRouter"
import { ticketRouter } from "./route/ticketRouter"
import { userRouter } from "./route/userRouter"


app.use("/users", userRouter)
app.use("/bands", bandRouter)
app.use("/concerts", concertRouter)
app.use("/tickets", ticketRouter)