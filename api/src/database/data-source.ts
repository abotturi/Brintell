import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "db",
    port: 3306,
    username: "root",
    password: "12345",
    database: "brintell",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: ["./src/database/migrations/*.ts"],
    subscribers: [],
})

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
})

export const manager = AppDataSource.manager
