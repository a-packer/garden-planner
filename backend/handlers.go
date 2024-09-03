package backend

import (
	"encoding/json"
	"log"
	"net/http"

	"database/sql"
)

// LoginHandler handles user login requests
func LoginHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("Login Handler is being triggered...")
		var user struct {
			Name     string `json:"name"`
			Password string `json:"password"`
		}
		if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		if VerifyLogin(db, user.Name, user.Password) {
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
