package backend

import (
	"encoding/json"
	"net/http"

	"database/sql"
)

// LoginHandler handles user login requests
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

// GetAllPlantsHandler handles requests for retrieving all plants
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
