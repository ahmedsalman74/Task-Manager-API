const asyncWrapper = require('../middlewares/async')
const Task = require('../models/taskModel')
const AppError = require('../utilites/appErrors')

const getAlltasks = asyncWrapper(
    async (req, res) => {

        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    }
)
const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })

})

const getTask = asyncWrapper(
    async (req, res, next) => {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })
        if (!task) {
            const error = AppError.create('Task not found', 404, "fail")
            return next(error)


        }
        return res.json({ task })

    })
const updateTask = async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
      })

    return res.json( { task } )
}
const deleteTask = async (req, res) => {
    const deleteTask = await Task.deleteOne({ _id: req.params.id })
    res.status(200).json({ status: "success", dat: null });


}
module.exports = {
    getAlltasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}