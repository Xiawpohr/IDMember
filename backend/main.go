package main

import (
	"IDMember/backend/controllers"
	"IDMember/backend/models"
	"IDMember/backend/middlewares"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB
var err error

func main() {
	db, err = gorm.Open("sqlite3", "./tmp/gorm.db")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	db.AutoMigrate(&models.User{})

	app := gin.Default()
	app.Use(middlewares.InjectDB(db))

	api := app.Group("/api/v1")
	{
		api.POST("/signup", controllers.Signup)
		api.POST("/login", controllers.Login)
		api.POST("/logout", controllers.Logout)
		userAPI := api.Group("/users", middlewares.Authenticated())
		{
			userAPI.GET("/", controllers.FetchAllUsers)
			userAPI.GET("/:slug", controllers.FetchSingleUser)
			userAPI.PUT("/currentUser", controllers.UpdateCurrentUser)
		}
	}

	app.Run()
}
