const pool = require('../../config/database')

const create = (data, callBack) => {
    pool.query(`insert into registration(firstName,lastName,gender,email,password,number) values(?,?,?,?,?,?)`,
        [
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.password,
            data.number
        ], (err, res, faileds) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, res)
        }
    )
}
const getUsers = (callBack) => {
    pool.query(
        `select * from registration `,
        [],
        (err, res, faileds) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, res)

        })
}
const getUserByUserId = (id, callBack) => {
    pool.query(`select * from registration where id=? `,
        [id],
        (err, res, faileds) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, res[0]) //return  array first one
        }
    )

}
const updateUser = (data, callBack) => {
    pool.query(`update registration set firstName=?,lastName=?,gender=?,email=?,password=?,number=? where id=?`, [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id
    ], (err, res, faileds) => {
        if (err) {
            return callBack(err)

        }
        return callBack(null, res)
    })

}
const deleteUser = (data, callBack) => {
    pool.query(`delete from registration where id=? `, [data.id], (err, res, faileds) => {
        if (err) {
            return callBack(err)

        }
        return callBack(null, res[0])
    })
}
const getUserByUserEmail=(email,callBack)=>{
    pool.query(`select * from registration where email=?`,[
        email
    ],(err,res,faileds)=>{
        if(err){
            return callBack(err)
        }
        return callBack(null,res[0])

    })
}


module.exports = {
    create,
    getUsers,
    getUserByUserId,
    updateUser,
    deleteUser,
    getUserByUserEmail
}