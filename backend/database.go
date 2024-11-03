package backend

import (
	"database/sql"
	"encoding/json"
	"errors"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

func InitDB() (*sql.DB, error) {
	// Delete the file to avoid duplicated records.
	if err := os.Remove("sqlite-database.db"); err != nil && !errors.Is(err, os.ErrNotExist) {
		log.Println("Error removing database file:", err)
		return nil, err
	}

	log.Println("Creating sqlite-database.db...")

	file, err := os.Create("sqlite-database.db")
	if err != nil {
		log.Println("Error creating database file:", err)
		return nil, err
	}
	file.Close()
	log.Println("sqlite-database.db created")

	db, err := sql.Open("sqlite3", "./sqlite-database.db")
	if err != nil {
		log.Println("Error opening database:", err)
		return nil, err
	}

	/////////// USERS ///////////

	// Ensure that the database connection remains open for the duration of the initialization.
	if err := CreateUsersTable(db); err != nil {
		db.Close()
		return nil, err
	}

	/////////// Plants ///////////

	// Ensure that the database connection remains open for the duration of the initialization.
	if err := CreatePlantsTable(db); err != nil {
		db.Close()
		return nil, err
	}

	type Plant struct {
		Species     string `json:"species"`
		NumWeeksIn  int    `json:"numWeeksIn"`
		WeeksRelOut int    `json:"weeksRelOut"`
		TotalGrowth int    `json:"totalGrowth"`
	}

	jsonData, err := os.ReadFile("plants.json")
	if err != nil {
		log.Fatalf("Failed to read JSON file: %v", err)
	}

	var plants []Plant
	if err := json.Unmarshal(jsonData, &plants); err != nil {
		log.Fatalf("Error parsing JSON data: %v", err)
	}

	for _, plant := range plants {
		_, err := db.Exec("INSERT INTO plants (species, numWeeksIn, weeksRelOut, totalGrowth) VALUES (?, ?, ?, ?)",
			plant.Species, plant.NumWeeksIn, plant.WeeksRelOut, plant.TotalGrowth)
		if err != nil {
			log.Printf("Error inserting plant %s: %v", plant.Species, err)
		}
	}

	log.Println("Data transfer complete!")

	if err := DisplayPlants(db); err != nil {
		db.Close()
		return nil, err
	}

	return db, nil
}
