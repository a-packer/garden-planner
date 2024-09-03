package backend

import (
	"database/sql"
	"log"
	 "golang.org/x/crypto/bcrypt"

	_ "github.com/mattn/go-sqlite3"
)

func CreateUsersTable(db *sql.DB) error {
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

func InsertUser(db *sql.DB, name string, password string, frostdate string) error {
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

func DisplayUsers(db *sql.DB) error {
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
		log.Println("User: ", id, " ", name, " ", password, frostdate)
	}

	return nil
}

// VerifyLogin checks if the provided username and password are correct
func VerifyLogin(db *sql.DB, name, password string) bool {
  var hashedPassword string
  err := db.QueryRow("SELECT password FROM users WHERE name = ?", name).Scan(&hashedPassword)
  if err != nil {
    // If there's an error querying the database, the user doesn't exist or another issue occurred
    return false
  }

  // Compare the provided password with the hashed password
  err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
  return err == nil
}

// GetUserByName retrieves a user from the database by their name
func GetUserByName(db *sql.DB, name string) (int, string, error) {
  var id int
  var password string
  err := db.QueryRow("SELECT id, password FROM users WHERE name = ?", name).Scan(&id, &password)
  if err != nil {
    return 0, "", err
  }
  return id, password, nil
}