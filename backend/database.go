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

	// Ensure that the database connection remains open for the duration of the initialization.
	if err := createTable(db); err != nil {
		db.Close()
		return nil, err
	}

	// INSERT RECORDS
	if err := insertUser(db, "Liana", "d7g8h9h0", "05/01"); err != nil {
		db.Close()
		return nil, err
	}
	if err := insertUser(db, "Dia", "d7g8h9h0", "05/01"); err != nil {
		db.Close()
		return nil, err
	}

	// DISPLAY INSERTED RECORDS
	if err := displayUsers(db); err != nil {
		db.Close()
		return nil, err
	}

	return db, nil
}

func createTable(db *sql.DB) error {
	createUserTableSQL := `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      frostdate TEXT
    );
  `
	log.Println("Creating users table...")
	statement, err := db.Prepare(createUserTableSQL)
	if err != nil {
		log.Println("Error preparing create table statement:", err)
		return err
	}
	defer statement.Close() // Ensure statement is closed after preparation
	_, err = statement.Exec()
	if err != nil {
		log.Println("Error executing create table statement:", err)
		return err
	}
	log.Println("Users table created")
	return nil
}

func insertUser(db *sql.DB, name string, password string, frostdate string) error {
	log.Println("Inserting user ...")
	insertUserSQL := `INSERT INTO users (name, password, frostdate) VALUES (?, ?, ?)`
	statement, err := db.Prepare(insertUserSQL)
	if err != nil {
		log.Println("Error preparing insert statement:", err)
		return err
	}
	defer statement.Close() // Ensure statement is closed after execution

	_, err = statement.Exec(name, password, frostdate)
	if err != nil {
		log.Println("Error executing insert statement:", err)
		return err
	}
	log.Println("User inserted successfully")
	return nil
}

func displayUsers(db *sql.DB) error {
	rows, err := db.Query("SELECT * FROM users ORDER BY name")
	if err != nil {
		log.Println("Error querying users:", err)
		return err
	}
	defer rows.Close()

	for rows.Next() {
		var id int
		var name string
		var password string
		var frostdate string
		if err := rows.Scan(&id, &name, &password, &frostdate); err != nil {
			log.Println("Error scanning row:", err)
			return err
		}
		log.Println("User: ", id, " ", name, " ", frostdate)
	}

	return nil
}
