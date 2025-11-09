const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 初始化数据库
const db = new sqlite3.Database(path.join(__dirname, 'contacts.db'), (err) => {
    if (err) {
        console.error('数据库连接失败:', err.message);
    } else {
        console.log('成功连接到SQLite数据库');
        // 创建联系人表
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('创建表失败:', err.message);
            }
        });
    }
});

// 控制器
const contactsController = require('./controller/contacts')(db);

// 路由
app.get('/contacts', contactsController.getAllContacts);
app.post('/contacts', contactsController.addContact);
app.put('/contacts/:id', contactsController.updateContact);
app.delete('/contacts/:id', contactsController.deleteContact);

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});

// 关闭数据库连接
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('关闭数据库连接失败:', err.message);
        }
        console.log('数据库连接已关闭');
        process.exit(0);
    });
});