import UserDTO from "./usersDTO.js";

export class UserRepository{

    constructor(dao){
        this.dao = dao
    }

    async createUser(data){
        const user = await this.dao.createUser(data)
        const userDTO = new UserDTO(user)
        return userDTO
    }

    async getUser(email){
        const user = await this.dao.getUser(email)
        const userDTO = new UserDTO(user)
        return userDTO
    }

    async updateUser(email, data, updatePassword = false){
        const user = await this.dao.updateUser(email, data, updatePassword)
        const userDTO = new UserDTO(user)
        return userDTO
    }

    async getUserByCart(idCart) {
        const user = await this.dao.getUserByCart(idCart)
        const userDTO = new UserDTO(user)
        return userDTO
    }

}