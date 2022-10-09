import { Router } from 'express';
import { UserController } from '../controller/userController'
import { User } from '../database/entity/User';
const route = Router()

const userControll = new UserController()

route.get('/', async (req, res) => {
    const userAll = await userControll.getAll()

    res.status(200).send({
        message: 'Research finished',
        users: userAll
    })
})

route.post('/', async (req, res) => {
    const {name, CPF, email, sex, tell} = req.body
    
    if(name && CPF && email && sex && tell){
        const user = new User(name, CPF, email, sex, tell)
        const userSave = await userControll.save(user)
        
        if(userSave.status){
            res.status(200).send({status: 'Success creating user'})
        }else{
            res.status(403).json({status: 'error', message: `${userSave.type} already used`})
        }

    }else{
        res.status(422).send({status: 'error', message: 'Important fields missing'})
    }
})

route.delete('/', async (req, res) => {
    const idUser = req.headers.id
    
    if(idUser){
        await userControll.delete(idUser)
        
        res.status(200).send({status: 'Successfully deleted'})
    }else{
        res.status(422).send({status: 'error', message: 'Important fields missing'})
    }

})


export default route