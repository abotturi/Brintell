import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true })
    CPF: string

    @Column({unique: true })
    email: string

    @Column()
    sex: string

    @Column({unique: true })
    telephone: string

    @CreateDateColumn()
    create_at: Date;
    
    constructor(name: string, CPF: string, email: string, sex: string, telephone: string){
        this.name = name
        this.CPF = CPF
        this.email = email
        this.sex = sex
        this.telephone = telephone
    }
}
