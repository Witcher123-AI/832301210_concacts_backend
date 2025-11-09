// contacts.js - 联系人控制器

module.exports = (db) => {
    return {
        // 获取所有联系人
        getAllContacts: (req, res) => {
            db.all('SELECT * FROM contacts', [], (err, rows) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.json(rows);
            });
        },
        
        // 添加联系人
        addContact: (req, res) => {
            const { name, phone } = req.body;
            
            if (!name || !phone) {
                res.status(400).json({ error: '姓名和电话号码不能为空' });
                return;
            }
            
            const sql = 'INSERT INTO contacts (name, phone) VALUES (?, ?)';
            db.run(sql, [name, phone], function(err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.json({ id: this.lastID, name, phone });
            });
        },
        
        // 更新联系人
        updateContact: (req, res) => {
            const { id } = req.params;
            const { name, phone } = req.body;
            
            if (!name || !phone) {
                res.status(400).json({ error: '姓名和电话号码不能为空' });
                return;
            }
            
            const sql = 'UPDATE contacts SET name = ?, phone = ? WHERE id = ?';
            db.run(sql, [name, phone, id], function(err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                
                if (this.changes === 0) {
                    res.status(404).json({ error: '联系人不存在' });
                    return;
                }
                
                res.json({ id: parseInt(id), name, phone });
            });
        },
        
        // 删除联系人
        deleteContact: (req, res) => {
            const { id } = req.params;
            
            const sql = 'DELETE FROM contacts WHERE id = ?';
            db.run(sql, [id], function(err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                
                if (this.changes === 0) {
                    res.status(404).json({ error: '联系人不存在' });
                    return;
                }
                
                res.json({ message: '联系人删除成功' });
            });
        }
    };
};