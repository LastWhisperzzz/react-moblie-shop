const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./plugins/db')
const colors = require('colors')
const productRoutes = require('./routes/productRoutes')

dotenv.config() // 从.env文件加载环境变量
connectDB() // 连接数据库

const app = express()
app.use(cors()) // 跨域
app.use(express.json()) // 将请求转为json

app.use('/api/products', productRoutes)

//错误处理中间件
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(
    `App running in ${process.env.NODE_ENV} at: http://localhost:${process.env.PORT}`.yellow.bold
  )
})
