## mangodb安装

### 1. 安装

下载地址：https://www.mongodb.com/try/download/community

添加环境变量

```bash
D:\Program Files\mongodb\bin
```

以管理员模式，切换到安装目录下的bin目录运行以下格式命令来指定mongdb的数据及日志目录

```bash
mongod --install --dbpath "D:\Program Files\mongodb\data" --logpath "D:\Program Files\mongodb\log\mongodb.log"
```

没有任何报错和提示，则代表MongoDB服务创建成功

### 2.下载MongoDB Shell

7.x后的.msi不包含mongosh所以我们还要单独下载

官网下载[MongoDB Shell Download | MongoDB](https://www.mongodb.com/try/download/shell)

### 3. mongosh

输入以下命令进行登录与退出

```
mongosh "mongodb://localhost:27017"

exit
```

### 4.Compass图形化连接登录

下载地址：https://www.mongodb.com/try/download/compass

解压，可以看到`MongoDBCompass.exe`，双击运行，直接Next，最后Get Stated，默认选项即可

直接点击CONNECT就会连接本地的数据库`localhost:27017`

## 优化mongodb查询效率

### 一、理解查询原理与索引设计

MongoDB的查询性能很大程度上取决于索引的设计。为了在大量数据中快速定位记录，首先要确保对频繁查询条件涉及的字段创建适当的索引。例如，如果我们经常通过username查找用户，则应在users集合上为username字段创建唯一索引：

```bash
db.users.createIndex({ username: 1 }, { unique: true });
```

### 二、选择合适的查询操作符与聚合管道

#### 1.查询操作符优化：

使用$match操作符在聚合管道早期阶段过滤数据，减少后续处理的数据量。

```bash
db.users.aggregate([
  { $match: { status: 'active', age: { $gte: 18, $lte: 60 } } },
  // 其他管道阶段...
]);
```

#### 2.覆盖索引与投影优化：

创建覆盖索引以加速只读查询，使得MongoDB可以直接从索引中获取所需的所有字段，无需回表查询。

```bash
db.users.createIndex({ username: 1, status: 1, age: 1 }); // 如果常按这三个字段查询
```

#### 3.排序与分页优化：

对于分页查询，结合sort()和skip()、limit()时，务必保证排序字段上有索引。

```bash
db.users.find().sort({ created_at: -1 }).skip(100).limit(10); // 应为created_at字段创建索引
```

#### 三、缓存利用与内存管理

利用MongoDB的WiredTiger存储引擎的缓存机制，确保足够的RAM供工作集数据缓存，减少磁盘I/O。
调整wiredTigerCacheSizeGB参数来增大缓存大小，以便更多热点数据能驻留在内存中。

### 四、全文索引与高级查询

对于模糊查询，MongoDB 4.2版后引入了全文索引功能，极大提升了文本查询性能：

```bash
db.collection.createIndex({ text_field: "text" });
db.collection.find({ $text: { $search: "query terms" } });
```

### 五、集群配置与分片策略

针对海量数据，实施分片(sharding)策略，根据数据访问模式分散负载至不同分片，降低单个节点的压力。

```bash
sh.enableSharding("database_name");
sh.shardCollection("database_name.collection", { shard_key: "hashed" });
```

### 六、监控与调优

使用MongoDB内置的mongotop和mongostat工具监控查询性能，以及MongoDB Atlas等云服务提供的可视化监控界面。
分析explain()输出，识别慢查询并针对性优化索引结构。
定期审计查询日志，发现潜在的资源消耗大户，并调整相关查询或更新索引设计。
查询百万级数据集时，提升MongoDB性能的关键在于精心设计索引、合理运用查询操作符和聚合管道、有效配置内存管理和集群架构，以及持续的监控和调优。通过这些手段，即使在大规模数据场景下也能保证查询的高效性，使应用程序保持良好的响应时间和用户体验。同时，随着MongoDB的不断迭代更新，了解并充分利用最新的功能特性也是提升查询性能不可或缺的一部分。
———————————————

版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

原文链接：https://blog.csdn.net/u010986241/article/details/136686736

## mongoose常见操作

#### Mongoose基本概念

------

Schema: 表定义模板

Model: 类似关系数据库表，封装成具有一些集合操作的对象

```
 let schema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createTime', updatedAt: 'updateTime', lastLoginDate: 'lastLoginDate'
    }
});

let userModel = mongoose.model('user', schema);
```

#### 常用API

------

一说到数据库，最先想到的就是增删改查。

##### 新增

###### Model.create(): 插入一个或多个文档

> Model.create(docs[, options][, callback])

如果插入一个文档，则传入一个对象即可；如果插入多个文档，则传入一个数组

```
 let doc = {
    id: 1,
    name: 'shan-er',
    age: 1
};
userModel.create(doc, (error) => {})
```

###### ModelEntity.save():只针对当前文档实例

> Document.prototype.save([options][, callback])

```
 let doc = {
    id: 1,
    name: 'shan-er',
    age: 1
};
let mongooseEntity = new userModel(doc);
mongooseEntity.save((error) => {})
```

###### Model.insertMany()

> Model.insertMany(docs[, options][, callback])

多条数据插入，将多条数据一次性插入，相对于循环使用create保存会更加快。

Mongoose 在向 MongoDB 发送 insertMany 之前会验证每个文档。因此，如果一个文档出现验证错误，则不会保存任何文档，除非将 ordered 选项设置为 false。

```
 let docs = [{
    id: 1,
    name: 'shan-er',
    age: 1
}, {
    id: 2,
    name: 'shan-er-2',
    age: 1
}];
userModel.insertMany(docs, (error, docs) => {})
```

###### create()与save()区别

Model.create()内部调用了<model_instance>.save()方法，并且做了一些额外的封装。

两者主要的区别在于：

- Model.create()可以同时保存一组文档。
- .save()只针对当前文档实例。

create(docs) 为 docs 中的每个文档执行 MyModel(doc).save()。

##### 查找

###### Model.find()

> Model.find(conditions, [fields], [options], [callback])

```
 userModel.find({age: 1}, (err, docs) => {
    // docs 是查询的结果数组
})

userModel.find({}, ['id','name'], (err, docs) => {
    // docs 此时只包含文档的部分键值
})
```

###### Model.findOne()

> Model.findOne([conditions], [projection], [options], [callback])

与 Model.find 相同，但只返回单个文档

```
 userModel.findOne({age: 1}, (err, doc) => {
    // doc 是单个文档
})
```

###### Model.findById()

> Model.findById(id, [projection], [options], [callback])

与 findOne 相同，但它接收文档的 _id 作为参数，返回单个文档。_id 可以是字符串或 ObjectId 对象。

```
 userModel.find(obj._id, (err, doc) => {
    // doc 是单个文档
})
```

##### 修改

###### Model.Update()

> Model.update(conditions, doc, [options], [callback])

conditions：查询条件；doc：需要修改的数据，不能修改主键（_id）；options：控制选项；

该方法会匹配到所查找的内容进行更新，返回数据处理条数;

```
 体验AI代码助手
 代码解读
复制代码userModel.update({name: 'shan-er'}, {$set : {age : 2}, {upsert : true}, (err) => {})
```

###### Model.findOneAndUpdate()

> Model.findOneAndUpdate([conditions], [update], [options], [callback])

该方法会根据查找去更新数据库，返回处理后的数据

需要获取数据就用findOneAndUpdate()，只需要修改数据而不关注修改后数据那就用update()

###### Model.findByIdAndUpdate()

> Model.findByIdAndUpdate(id, [update], [options], [callback])

###### Model.updateMany():一次更新多条

> Model.updateMany(conditions, doc, [options], [callback])

###### Model.updateOne(): 一次更新一条

> Model.updateOne(conditions, doc, [options], [callback])

###### options说明

```
 options有以下选项：
    new： bool - 默认为false。返回修改后的数据。
    upsert： bool - 默认为false。如果不存在则创建记录。
    fields： {Object|String} - 选择字段。类似.select(fields).findOneAndUpdate()。
    maxTimeMS： 查询用时上限。
    sort： 如果有多个查询条件，按顺序进行查询更新。
    runValidators： 如果值为true，执行Validation验证。
    setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。
    passRawResult： 如果为真，将原始结果作为回调函数第三个参数。
```

###### .save()和update() 区别

1. update比find之后save()效率高，因为这样不用读取整个文档。
2. Mongoose的update是MongoDB的update，但是Mongoose的save可能是MongoDB的插入或是update。
3. 关于save，mongoose会自动diff新文档，只更改更新部分。这有利于原子性。
4. update不能触发中间件，validation默认不能，但是可以修改。

##### 删除

###### Model.remove()

> Model.remove(conditions[, options][, callback])

remove方法有两种使用方式，一种是用在模型上，另一种是用在模型实例上.

从集合中删除所有匹配 conditions 条件的文档

###### Model.findOneAndRemove()

> Model.findOneAndRemove(conditions[, options][, callback])

###### Model.findByIdAndRemove()

> Model.findOneAndRemove(id[, options][, callback])

###### Model.deleteOne()

> Model.deleteOne(conditions[, options][, callback])

删除符合 conditions 条件的第一条文档。

###### Model.deleteMany()

> Model.deleteMany(conditions[, options][, callback])

删除所有符合 conditions 条件的文档。

###### remove与deleteMany的区别

一样的效果，返回值不一样。

remove()并不会真正释放空间。需要继续执行 db.repairDatabase() 来回收磁盘空间。

官方建议使用deleteOne()、deleteMany()

##### 常见问题汇总

------

###### 用Mongoose得到的对象不能增加属性

原因：

因为Mongoose是個ODM (Object Document Mapper)，类似于操作关系型数据库使用的ORM(Object Relational Mapper)，我们使用Mongoose取到的数据的结构是要依赖于我们定义的schema结构的。增加的属性在schema中没有定义，所以我们在取到的结果中增加某个属性是无效的。

**方法一：在Schema中增加属性**

增加属性：一是直接增加属性值，入库；

- **直接修改 Schema**：在定义 Schema 时直接添加新属性。
- **动态修改 Schema**：使用 `schema.add()` 方法动态添加属性。
- **使用 `schema.path()` 或 `schema.set()`**：通过这些方法添加新属性。

二若不想入库，可以使用virtual属性

```
 schema.virtual('fullName').get(function () {
  return  this.firstName + this.lastName;
});

// 获取vitual属性,两种方式获取

// 1. doc._doc.fullName 获取


// 2. 
// userModel.set('toObject', {virtuals: true});
// userModel.set('toJSON', {virtuals: true});
```

示例代码：

```javascript
const mongoose = require('mongoose');
const { Schema } = mongoose;

// 定义 User Schema
const userSchema = new Schema({
  name: String,
  age: Number
});

// 添加虚拟属性 fullName
userSchema.virtual('fullName').get(function() {
  return `${this.name} (Age: ${this.age})`;
});

// 设置 toObject 选项，包含虚拟属性
userSchema.set('toObject', { virtuals: true });

// 创建模型
const User = mongoose.model('User', userSchema);

// 测试
const user = new User({ name: 'Alice', age: 25 });

// 直接访问 _doc
console.log(user._doc); // 输出: { name: 'Alice', age: 25, __v: 0 }
console.log(user._doc.fullName); // 输出: undefined

// 转换为对象
const userObject = user.toObject();
console.log(userObject); // 输出: { _id: ..., name: 'Alice', age: 25, fullName: 'Alice (Age: 25)' }
```

**方法二：clone结果值**

作者：朽木_露琪亚
链接：https://juejin.cn/post/6844904103810695181
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

### mongoose管道操作

#### 1. `$match` 阶段

`$match` 阶段用于根据指定的条件过滤文档。它接受一个条件表达式，只有满足条件的文档才会进入下一个管道阶段。

##### 示例代码

```javascript
db.users.aggregate([
  { $match: { status: 'active', age: { $gte: 18, $lte: 60 } } },
  // 其他管道阶段...
]);
```

##### 字段解释

- **`status: 'active'`**：
  - 筛选出 `status` 字段值为 `'active'` 的文档。
- **`age: { $gte: 18, $lte: 60 }`**：
  - 筛选出 `age` 字段值大于或等于 18 且小于或等于 60 的文档。
  - `$gte`（Greater Than or Equal）：大于或等于。
  - `$lte`（Less Than or Equal）：小于或等于。

#### 2. Mongoose 中的聚合管道操作

Mongoose 是一个基于 Node.js 的 MongoDB ORM（对象关系映射）工具，它提供了更简洁的语法来操作 MongoDB。在 Mongoose 中，你可以使用 `.aggregate()` 方法来执行聚合查询。

##### 示例代码

```javascript
const User = mongoose.model('User', userSchema);

User.aggregate([
  { $match: { status: 'active', age: { $gte: 18, $lte: 60 } } },
  // 其他管道阶段...
])
.then(result => {
  console.log(result);
})
.catch(err => {
  console.error(err);
});
```

#### 3. 常见的聚合管道阶段

以下是一些常用的聚合管道阶段及其作用：

##### 3.1 `$group`

用于对数据进行分组，并可以对分组后的数据进行聚合操作（如求和、计数等）。

```javascript
{ $group: { _id: '$status', count: { $sum: 1 } } }
```

- `_id`：分组的字段。
- `$sum`：对每个分组的数据进行求和。

##### 3.2 `$project`

用于选择或排除文档中的字段，也可以添加新的字段。

```javascript
{ $project: { username: 1, age: 1, _id: 0 } }
```

- `1`：包含该字段。
- `0`：排除该字段。

##### 3.3 `$sort`

用于对结果进行排序。

```javascript
{ $sort: { age: 1 } }
```

- `1`：升序。
- `-1`：降序。

##### 3.4 `$limit` 和 `$skip`

用于分页查询。

```javascript
{ $limit: 10 }
{ $skip: 20 }
```

- `$limit`：限制返回的文档数量。
- `$skip`：跳过指定数量的文档。

##### 3.5 `$lookup`

用于执行左外连接，可以将两个集合的数据进行关联。

```javascript
{
  $lookup: {
    from: 'orders',
    localField: 'username',
    foreignField: 'user',
    as: 'orders'
  }
}
```

- `from`：目标集合。
- `localField`：当前集合中的字段。
- `foreignField`：目标集合中的字段。
- `as`：结果存储的字段名。

##### 3.6 `$unwind`

用于将数组字段展开为多个文档。

```javascript
{ $unwind: '$orders' }
```

- `$unwind`：展开数组字段。

#### 4. 完整示例

以下是一个完整的 Mongoose 聚合查询示例：

```javascript
const User = mongoose.model('User', userSchema);

User.aggregate([
  { $match: { status: 'active', age: { $gte: 18, $lte: 60 } } },
  { $group: { _id: '$status', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 10 }
])
.then(result => {
  console.log(result);
})
.catch(err => {
  console.error(err);
});
```

#### 总结

- **`$match`**：用于筛选满足条件的文档。
- **`$group`**：用于对数据进行分组和聚合。
- **`$project`**：用于选择或排除字段。
- **`$sort`**：用于对结果进行排序。
- **`$limit` 和 `$skip`**：用于分页查询。
- **`$lookup`**：用于执行左外连接。
- **`$unwind`**：用于展开数组字段。

## 关联不同表

在 Mongoose 中，可以通过**引用（References）**和**虚拟（Virtuals）**来实现不同集合（表）之间的关联。以下是两种常见的关联方式：

### 1. 使用引用（References）

通过在模型中存储其他模型的 `_id` 来建立关联关系。这种方式在查询时需要手动进行关联查询。

##### 示例：员工与部门的关联

假设我们有两个集合：`Employee` 和 `Department`。

**部门模型（Department）**

```javascript
const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema({
  name: String,
  location: String
});

const Department = mongoose.model('Department', departmentSchema);
```

**员工模型（Employee）**

```javascript
const employeeSchema = new Schema({
  name: String,
  age: Number,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' } // 引用 Department 模型的 _id
});

const Employee = mongoose.model('Employee', employeeSchema);
```

**查询关联数据**

```javascript
async function getEmployeeWithDepartment() {
  try {
    // 查询员工数据，并关联查询部门信息
    const employee = await Employee.findById('employeeId').populate('department');
    console.log(employee);
  } catch (error) {
    console.error('查询失败：', error);
  }
}
```

### 2. 使用虚拟（Virtuals）

虚拟字段是 Mongoose 提供的一种方式，可以在模型中定义一个虚拟字段，通过 `populate` 方法来填充关联数据。

##### 示例：订单与用户关联

假设我们有两个集合：`Order` 和 `User`。

**用户模型（User）**

```javascript
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);
```

**订单模型（Order）**

```javascript
const orderSchema = new Schema({
  product: String,
  price: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // 引用 User 模型的 _id
});

orderSchema.virtual('userDetails', {
  ref: 'User', // 关联的模型
  localField: 'user', // 当前模型中存储关联数据的字段
  foreignField: '_id', // 关联模型的主键字段
  justOne: true // 是否只返回一个关联文档
});

const Order = mongoose.model('Order', orderSchema);
```

**查询关联数据**

```javascript
async function getOrderWithUserDetails() {
  try {
    // 查询订单数据，并关联查询用户详情
    const order = await Order.findById('orderId').populate('userDetails');
    console.log(order);
  } catch (error) {
    console.error('查询失败：', error);
  }
}
```

#### 总结

- **引用（References）**：通过存储其他模型的 `_id` 来建立关联关系，查询时需要手动调用 `populate` 方法。
- **虚拟（Virtuals）**：通过定义虚拟字段来实现关联，可以在模型中直接定义关联逻辑，查询时使用 `populate` 方法填充关联数据。

你可以根据实际需求选择合适的关联方式。