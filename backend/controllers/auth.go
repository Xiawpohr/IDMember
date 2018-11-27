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
