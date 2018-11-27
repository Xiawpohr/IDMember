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
	// app.POST("/login", login)
	// app.POST("/logout", logout)
	app.POST("/signup", controllers.Signup)
	app.Run()
}

// // User type
// type User struct {
// 	ID       int
// 	Email    string
// 	Password string
// }

// // UserView type
// type UserView struct {
// 	ID        int
// 	Email     string
// 	FirstName string
// 	LastName  string
// }

// func login(c *gin.Context) {
// 	user := User{
// 		ID:        1,
// 		Email:     "test@example.com",
// 		Password:  "Aa=123",
// 		FirstName: "Arthur",
// 		LastName:  "Hsiao",
// 	}
// 	_, err := c.Cookie("idmember_uid")
// 	if err != nil {
// 		// email := c.PostForm("email")
// 		password := c.PostForm("password")
// 		if password == user.Password {
// 			c.SetCookie("idmember_uid", "1", 3600, "/", "localhost", false, true)
// 			c.JSON(http.StatusOK, gin.H{
// 				"status":  http.StatusOK,
// 				"message": "Log In Successfully.",
// 				"user":    UserView{user.ID, user.Email, user.FirstName, user.LastName},
// 			})
// 		} else {
// 			c.JSON(http.StatusUnauthorized, gin.H{
// 				"status":  http.StatusUnauthorized,
// 				"message": "Your email or password is valid.",
// 				"user":    nil,
// 			})
// 		}
// 	} else {
// 		c.JSON(http.StatusOK, gin.H{
// 			"status":  http.StatusOK,
// 			"message": "You have Logged in.",
// 			"user":    UserView{user.ID, user.Email, user.FirstName, user.LastName},
// 		})
// 	}
// }

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
