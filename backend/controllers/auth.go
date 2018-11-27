package controllers

import (
	"IDMember/backend/models"

	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

// Signup controller
func Signup(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	email := c.PostForm("email")
	password := c.PostForm("password")
	confirmedPassword := c.PostForm("confirmedPassword")
	if password != confirmedPassword {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status":  http.StatusUnprocessableEntity,
			"message": "Your password is not confirmed.",
		})
	} else {
		hash, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
		user := models.User{Email: email, Password: string(hash)}
		db.Create(&user)

		c.SetCookie("idmember_uid", strconv.Itoa(int(user.ID)), 3600, "/", "localhost", false, true)
		c.JSON(http.StatusOK, gin.H{
			"status": http.StatusOK,
			"messge": "Sign Up successfully.",
			"user":   user.Serialize(),
		})
	}
}

// Login controller
func Login(c *gin.Context) {
	var user models.User
	db := c.MustGet("db").(*gorm.DB)

	_, err := c.Cookie("idmember_uid")
	if err != nil {
		email := c.PostForm("email")
		password := c.PostForm("password")
		db.Where("email = ?", email).First(&user)
		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status":  http.StatusUnauthorized,
				"message": "Your email or password is valid.",
				"user":    nil,
			})
		} else {
			c.SetCookie("idmember_uid", "1", 3600, "/", "localhost", false, true)
			c.JSON(http.StatusOK, gin.H{
				"status":  http.StatusOK,
				"message": "Log In Successfully.",
				"user":    user.Serialize(),
			})
		}
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status":  http.StatusOK,
			"message": "You have Logged in.",
			"user":    user.Serialize(),
		})
	}
}

// Logout controller
func Logout(c *gin.Context) {
	_, err := c.Cookie("idmember_uid")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"status":  http.StatusUnauthorized,
			"message": "You have to been log in first.",
		})
	} else {
		c.SetCookie("idmember_uid", "", -1, "/", "localhost", false, true)
		c.JSON(http.StatusOK, gin.H{
			"status":  http.StatusOK,
			"message": "Log Out Successfully.",
		})
	}
}
