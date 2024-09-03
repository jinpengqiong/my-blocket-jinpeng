# 运行前配置说明
1. 请先修改根目录下的.env文件, 配置为本地数据库连接地址,同时prisma/schema.prisma文件的provider也要修改下数据库类型名称,例如mysql或postgresql
2. 使用如下命令按照依赖
`
pnpm install 或 yarn install 或 npm install
`
3. 使用如下命令建表
`
pnpm run pre-start
`
# 本地运行
1. 确保server端已启动
2. 使用如下命令运行blacket
`
pnpm run dev
`

