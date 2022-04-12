import Neode from "neode";
import dotenv from "dotenv";

dotenv.config();

function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

async function connect() {
  try {
    //   const instance = Neode.fromEnv()
    const instance = new Neode("bolt://neo4j:7687", "neo4j", "password");
    instance.with({
      Person: instance.model("Person", {
        person_id: {
          primary: true,
          type: "uuid",
          required: true, // Creates an Exists Constraint in Enterprise mode
        },
        payroll: {
          type: "number",
          unique: "true", // Creates a Unique Constraint
        },
        name: {
          type: "name",
          index: true, // Creates an Index
        },
        age: "number", // Simple schema definition of property : type
      }),
    });


    await instance.create("Person", {
      name: "Adam",
    });

    const result = await instance.cypher("MATCH (p:Person) RETURN p");

    console.log(result.records[0]);
  } catch (error) {
    console.log(error);
  }
}

msleep(10000);
connect();
