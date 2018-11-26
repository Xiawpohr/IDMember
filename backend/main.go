package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	app := gin.Default()
	app.POST("/login", login)
	app.Run()
}

// User type
type User struct {
	ID        int
	Email     string
	Password  string
	FirstName string
	LastName  string
}

// UserView type
type UserView struct {
	ID        int
	Email     string
	FirstName string
	LastName  string
}

func login(c *gin.Context) {
	user := User{
		ID:        1,
		Email:     "test@example.com",
		Password:  "Aa=123",
		FirstName: "Arthur",
		LastName:  "Hsiao",
	}
	_, err := c.Cookie("idmember_uid")
	if err != nil {
		// email := c.PostForm("email")
		password := c.PostForm("password")
		if password == user.Password {
			c.SetCookie("idmember_uid", "1", 3600, "/", "localhost", false, true)
			c.JSON(http.StatusOK, gin.H{
				"status":  http.StatusOK,
				"message": "Log In Success.",
				"user":    UserView{user.ID, user.Email, user.FirstName, user.LastName},
			})
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status":  http.StatusUnauthorized,
				"message": "Your email or password is valid.",
				"user":    nil,
			})
		}
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status":  http.StatusOK,
			"message": "You have Logged in.",
			"user":    UserView{user.ID, user.Email, user.FirstName, user.LastName},
		})
	}
}
