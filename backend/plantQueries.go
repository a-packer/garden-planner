package backend

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func CreatePlantsTable(db *sql.DB) error {
	createPlantsTableSQL := `
    CREATE TABLE IF NOT EXISTS plants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      species TEXT NOT NULL,
      numWeeksIn INT,
      weeksRelOut INT,
      totalGrowth INT
    );
  `
	log.Println("Creating plants table...")
	statement, err := db.Prepare(createPlantsTableSQL)
	if err != nil {
		log.Println("Error preparing create plants table statement:", err)
		return err
	}
	defer statement.Close() // Ensure statement is closed after preparation
	_, err = statement.Exec()
	if err != nil {
		log.Println("Error executing create plants table statement:", err)
		return err
	}
	log.Println("plants table created")
	return nil
}

func InsertPlant(db *sql.DB, species string, numWeeksIn int, weeksRelOut int, totalGrowth int) error {
	log.Println("Inserting plant ...")
	insertPlantSQLSQL := `INSERT INTO plants (species, numWeeksIn, weeksRelOut, totalGrowth) VALUES (?, ?, ?, ?)`
	statement, err := db.Prepare(insertPlantSQLSQL)
	if err != nil {
		log.Println("Error preparing insert plant statement:", err)
		return err
	}
	defer statement.Close() // Ensure statement is closed after execution

	_, err = statement.Exec(species, numWeeksIn, weeksRelOut, totalGrowth)
	if err != nil {
		log.Println("Error executing insert plant statement:", err)
		return err
	}
	log.Println("Plant inserted successfully")
	return nil
}

func DisplayPlants(db *sql.DB) error {
	rows, err := db.Query("SELECT * FROM plants ORDER BY species")
	if err != nil {
		log.Println("Error querying plants:", err)
		return err
	}
	defer rows.Close()

	for rows.Next() {
		var id int
		var species string
		var numWeeksIn int
		var weeksRelOut int
		var totalGrowth int
		if err := rows.Scan(&id, &species, &numWeeksIn, &weeksRelOut, &totalGrowth); err != nil {
			log.Println("Error scanning row:", err)
			return err
		}
		log.Println("User: ", id, " ", species, " ", totalGrowth)
	}

	return nil
}
