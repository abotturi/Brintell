import { manager } from "../database/data-source"
import { User } from '../database/entity/User'

const userRepository = manager.getRepository(User)

export class UserController {
    async save(user: User){                
        const checkerCPF = await userRepository.find({
            where: {
                CPF: user.CPF
            }
        })
        
        if(checkerCPF.length > 0){
            return {status: false, type: 'CPF'}
        }        

        const checkerTelephone = await userRepository.find({
            where: {
                telephone: user.telephone
            }
        })
        
        if(checkerTelephone.length > 0){
            return {status: false, type: 'Telephone'}
        }

        const checkerEmail = await userRepository.find({
            where: {
                email: user.email
            }
        })
        
        if(checkerEmail.length > 0){
            return {status: false, type: 'Email'}
        }

        const userSave = await manager.save(user)
        return {status: true, type: userSave}
    }

    async getAll(){
        const userAll = await userRepository.find({
            order: {
                name: 'ASC'
            }
        })
        return userAll
    }

    async delete(id: any){
        const deleteData = await userRepository.createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id: id })
        .execute()

        return deleteData
    }
}