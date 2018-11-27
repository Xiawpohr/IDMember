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
	app.POST("/signup", controllers.Signup)
	app.POST("/login", controllers.Login)
	// app.POST("/logout", logout)
	app.Run()
}

// func logout(c *gin.Context) {
// 	_, err := c.Cookie("idmember_uid")
// 	if err != nil {
// 		c.JSON(http.StatusUnauthorized, gin.H{
// 			"status":  http.StatusUnauthorized,
// 			"message": "You have to been log in first.",
// 		})
// 	} else {
// 		c.SetCookie("idmember_uid", "1", -1, "/", "localhost", false, true)
// 		c.JSON(http.StatusOK, gin.H{
// 			"status":  http.StatusOK,
// 			"message": "Log Out Successfully.",
// 		})
// 	}
// }
