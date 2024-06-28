const mysql = require('mysql2/promise');
const validator = require('validator');

// Create a connection to the MySQL database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contact'
});

conn.then(connection => {
    console.log('MySQL Connected');
}).catch(err => {
    console.error('Error connecting to MySQL: ', err.stack);
    throw err;
});

// Function to get all contacts
const getAllContacts = async () => {
    try {
        const connection = await conn;
        const [results] = await connection.query('SELECT * FROM contact');
        return results;
    } catch (err) {
        console.error('Error querying database: ', err.stack);
        throw err;
    }
};

// Function to get a contact by ID
const getContactById = async (id) => {
    try {
        const connection = await conn;
        const [results] = await connection.query('SELECT * FROM contact WHERE id = ?', [id]);
        return results[0];
    } catch (err) {
        console.error('Error querying database: ', err.stack);
        throw err;
    }
};

// Function to create a new contact
const createContact = async (nama, hp, email) => {
    try {
        const connection = await conn;
        const [result] = await connection.query(
            'INSERT INTO contact (nama, hp, email) VALUES (?, ?, ?)',
            [nama, hp, email]
        );
        return result.insertId;
    } catch (err) {
        console.error('Error querying database: ', err.stack);
        throw err;
    }
};

// Function to update a contact by ID
const updateContact = async (id, nama, hp, email) => {
    try {
        const connection = await conn;
        const [result] = await connection.query(
            'UPDATE contact SET nama = ?, hp = ?, email = ? WHERE id = ?',
            [nama, hp, email, id]
        );
        return result.affectedRows;
    } catch (err) {
        console.error('Error querying database: ', err.stack);
        throw err;
    }
};

// Function to delete a contact by ID
const deleteContact = async (id) => {
    try {
        const connection = await conn;
        const [result] = await connection.query('DELETE FROM contact WHERE id = ?', [id]);
        return result.affectedRows;
    } catch (err) {
        console.error('Error querying database: ', err.stack);
        throw err;
    }
};

// Validation functions
const validateEmail = (email) => validator.isEmail(email);
const validatehp = (hp) => validator.isMobilePhone(hp, 'id-ID');

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    validateEmail,
    validatehp
};
