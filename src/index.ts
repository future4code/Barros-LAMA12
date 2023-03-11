import { app } from "./app"
import { userRouter } from "./route/userRouter"


app.use("/users", userRouter)