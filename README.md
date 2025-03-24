# yyjexcel

一组仿Excel的UI组件，已经整合element-ui
核心开源组件地址https://github.com/jspreadsheet/ce

# 编译

+ 修改package.json中version，version必须更大才能发布
+ 使用npm run build进行编译。build除了修改了入口文件之外，相比纯js的版本，增加了对vue的支持。工程中需要把所有要export的东西都放到export.js这个js中

# 发布

+ 发布指令：npm publish dist --registry=http://opt.glims.cc:51873
+ 如果需要账号密码(报E401错误)：npm login --registry=http://opt.glims.cc:51873 账号/密码/邮箱: npmuser/npmuser/npm@glims.cc
+ 查看已经发布的包：npm view yyjexcel --registry=http://opt.glims.cc:51873



# 在新工程中安装已经发布的包

+ 卸载旧版：npm uninstal yyjexcel
+ 升级: npm update yyjexcel --registry=http://opt.glims.cc:51873
+ 安装指令：npm install yyjexcel --save --registry=http://opt.glims.cc:51873


# npm 配置公司专用的镜像源
设置镜像  
npm config set registry http://opt.glims.cc:51873  
登录到镜像  
npm login --registry=http://opt.glims.cc:51873   
账号/密码/邮箱，分别填写: npmuser/npmuser/npm@glims.cc


# todo

+ 支持图片和文件格式
+ 支持ESC键

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
