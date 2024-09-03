# 运行前配置说明
1. Node.js版本建议在20或以上的版本
2. 请先修改根目录下的.env文件, 配置为本地数据库连接地址,同时在`prisma/schema.prisma`文件中`provider`也要修改下数据库类型名称,例如mysql或postgresql, 参考如下示例:
.env:
```bash
DATABASE_URL="数据库类型://用户名:密码@localhost:5432/数据库名"
示例: DATABASE_URL="postgresql://postgres:111111Qq~@localhost:5432/blocklet"
```

prisma/schema.prisma:
```bash
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
```
3. 使用如下命令安装依赖
```bash
pnpm install 或 yarn install 或 npm install
```
4. 使用如下命令建表
```bash
pnpm run pre-start
```
# 本地运行
1. 确保Blocklet Server端已启动
2. 使用如下命令运行blocket实例
```bash
pnpm run dev
```

