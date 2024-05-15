const client = require("./db");

async function isReady() {
  try {
    const tableCheckQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = $1
      );
    `;

    const createTableQueries =[
      `CREATE TABLE IF NOT EXISTS patients  (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL ,
        phone VARCHAR(255) ,
        whatsapp VARCHAR(255) ,
        job VARCHAR(255) ,
        mail VARCHAR(255) ,
        questionans VARCHAR(1000)      
      );`,

      `CREATE TABLE IF NOT EXISTS network (
        id SERIAL PRIMARY KEY,
        parent_id VARCHAR(255) REFERENCES patients(id),
        son_id VARCHAR(255) REFERENCES patients(id)
      );
      `
    ];

    const tablesToCheck = [
      "patients",
      "network"
    ];

    let c = 0;

    for (let i = 0; i < tablesToCheck.length; i++) {
      const res = await client.query(tableCheckQuery, [tablesToCheck[i]]);
      const existingTable = res.rows[0].exists;

      if (!existingTable) {
        await client.query(createTableQueries[i]);
        c++;
      }
    }

    console.log(`${c} tables created successfully!`);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

module.exports = isReady;
