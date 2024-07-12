const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')



app.get('/', (req,res) => {
    const connection = mysql.createConnection(config)

    const sql = `INSERT INTO people(name) values('João Vitor')`
    connection.query(sql)
    getAll(res, connection);
})

app.listen(port, ()=> {
    console.log('Rodando na porta '+port)
})

function getAll(res, connection){

    const select = `select id, name from people`;

    connection.query(select, (error, results) =>{
        const tableRows = results.map((person) => `
        <tr>
            <td>${person.id}</td>
            <td>${person.name}</td>
        </tr>`).join('');
    
        const table = `
        <table>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>${tableRows}
        </table>`
    
        res.send(`
            <h1>Full Cycle Rocks!</h1>
            ${table}
          `);
      
          connection.end();
    });

}