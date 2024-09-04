package main

import (
	"fmt"
	"garden-planner/backend"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	db, err := backend.InitDB()
	if err != nil {
		log.Fatalf("Error initializing database: %v", err)
		return
	}
	defer db.Close()

	router := mux.NewRouter()

	// API endpoints
	router.HandleFunc("/login", backend.LoginHandler(db)).Methods(http.MethodPost)
	// router.HandleFunc("/register", backend.RegisterHandler(db)).Methods(http.MethodPost)
	router.HandleFunc("/plants", backend.GetAllPlantsHandler(db)).Methods(http.MethodGet)
	// router.HandleFunc("/gardens", backend.GetUserPlantsHandler(db)).Methods(http.MethodGet)

	// Serve the React app
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./build/")))

	fmt.Println("Server is listening on :8080...")
	if err := http.ListenAndServe(":8080", router); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
