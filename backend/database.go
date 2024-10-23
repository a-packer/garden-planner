package backend

import (
	"database/sql"
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

	// // INSERT AND DISPLAY RECORDS for testing
	if err := InsertPlant(db, "Basil", 5, 1, 12); err != nil {
		db.Close()
		return nil, err
	}
	if err := InsertPlant(db, "Beets", 5, -2, 20); err != nil {
		db.Close()
		return nil, err
	}
	if err := InsertPlant(db, "Tomato", 7, 2, 14); err != nil {
		db.Close()
		return nil, err
	}
	if err := DisplayPlants(db); err != nil {
		db.Close()
		return nil, err
	}

	return db, nil
}
