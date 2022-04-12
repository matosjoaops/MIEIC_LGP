import Neode from "neode";
import dotenv from "dotenv";

dotenv.config();

async function connect() {
  try {
    //   const instance = Neode.fromEnv()
    const instance = new Neode('bolt://neo4j:7687', 'neo4j', 'neo4j')
    const result = await instance.with({
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
    console.log(result)

    const result2 = await instance.cypher("MATCH (p:Person) RETURN p")
    console.log(result2)
  } catch (error) {
    console.log(error);
  }
}

connect();
