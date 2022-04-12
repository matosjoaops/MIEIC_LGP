import neo4j from "neo4j-driver";

async function connect() {
  try {
    const driver = neo4j.driver(
      "bolt://neo4j",
      neo4j.auth.basic("neo4j", "neo4j")
    );

    const session = driver.session();

    //  session.run("ALTER CURRENT USER SET PASSWORD FROM 'neo4j' TO 'password")

    session
      .run("MATCH (n) RETURN (n)")
      .then((result) => {
        console.log("RESULT:" + result);
      })
      .catch((error) => {
        console.log("CATCH_ERROR:" + error);
      })
      .then(() => {
        session.close();
      });

    await driver.close();
    console.log("IM HERE");
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

connect();
