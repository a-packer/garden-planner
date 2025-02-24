package backend

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
)

func RegisterHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var user struct {
			Username string `json:"registerUsername"` // these names need to match
			Password string `json:"registerPassword"` // what we're sending in the payload
		}
		if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, "Error creating password", http.StatusInternalServerError)
			return
		}

		if err := InsertUser(db, user.Username, hashedPassword, "05/01"); err != nil {
			db.Close()
		}

		w.WriteHeader(http.StatusCreated)
		log.Println(w, "User registered successfully")
		DisplayUsers(db)
	}

}

func LoginHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var user struct {
			Username string `json:"username"`
			Password string `json:"password"`
		}
		if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		if VerifyLogin(db, user.Username, user.Password) {
			response := map[string]string{"message": "Login successful"}
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(response)
		} else {
			response := map[string]string{"message": "Invalid username or password"}
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(response)
		}
	}
}

func GetAllPlantsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query("SELECT id, species FROM plants")
		if err != nil {
			http.Error(w, "Error fetching plants", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var plants []struct {
			ID      int    `json:"id"`
			Species string `json:"species"`
		}

		for rows.Next() {
			var plant struct {
				ID      int    `json:"id"`
				Species string `json:"species"`
			}
			if err := rows.Scan(&plant.ID, &plant.Species); err != nil {
				http.Error(w, "Error scanning plants", http.StatusInternalServerError)
				return
			}
			plants = append(plants, plant)
		}

		if err := rows.Err(); err != nil {
			http.Error(w, "Error processing plants", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(plants); err != nil {
			http.Error(w, "Error encoding plants", http.StatusInternalServerError)
			return
		}
	}
}

func GetPlantHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Extract the species from the URL
		vars := mux.Vars(r)
		species := vars["plant"]

		var plant struct {
			ID          int    `json:"id"`
			Species     string `json:"species"`
			NumWeeksIn  int    `json:"numWeeksIn"`
			WeeksRelOut int    `json:"weeksRelOut"`
			TotalGrowth int    `json:"totalGrowth"`
		}

		query := "SELECT id, species, numWeeksIn, weeksRelOut, totalGrowth FROM plants WHERE species = ?"
		err := db.QueryRow(query, species).Scan(
			&plant.ID, &plant.Species, &plant.NumWeeksIn, &plant.WeeksRelOut, &plant.TotalGrowth,
		)

		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "Plant not found", http.StatusNotFound)
				return
			}
			log.Printf("Error retrieving plant: %v", err)
			http.Error(w, "Server error", http.StatusInternalServerError)
			return
		}

		// Encode the plant as JSON and return the response
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(plant); err != nil {
			http.Error(w, "Error encoding plant", http.StatusInternalServerError)
		}
	}
}
