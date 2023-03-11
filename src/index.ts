import { app } from "./app"
import { bandRouter } from "./route/bandRouter"
import { userRouter } from "./route/userRouter"


app.use("/users", userRouter)
app.use("/bands", bandRouter)