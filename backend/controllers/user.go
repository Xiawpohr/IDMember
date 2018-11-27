package controllers

import (
	"IDMember/backend/models"

	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

// FetchAllUsers controller
func FetchAllUsers(c *gin.Context) {
	var users []models.User
	db := c.MustGet("db").(*gorm.DB)
	if err := db.Find(&users).Error; err != nil {
		c.AbortWithStatus(404)
	} else {
		var usersJSON []models.JSON
		for _, user := range users {
			usersJSON = append(usersJSON, user.Serialize())
		}
		c.JSON(http.StatusOK, gin.H{
			"status": http.StatusOK,
			"users":  usersJSON,
		})
	}
}

// FetchSingleUser controller
func FetchSingleUser(c *gin.Context) {
	var user models.User
	var userID string
	db := c.MustGet("db").(*gorm.DB)
	slug := c.Param("slug")

	if slug == "currentUser" {
		uid, authErr := c.Cookie("idmember_uid")
		if authErr != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status":  http.StatusUnauthorized,
				"message": "You have to been log in first.",
			})
		} else {
			userID = uid
		}
	} else {
		userID = slug
	}

	if dbErr := db.Where("id = ?", userID).First(&user).Error; dbErr != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status": http.StatusOK,
			"user":   user.Serialize(),
		})
	}
}
