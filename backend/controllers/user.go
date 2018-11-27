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
	db := c.MustGet("db").(*gorm.DB)
	currentUser := c.MustGet("user").(models.User)
	slug := c.Param("slug")

	if slug == "currentUser" {
		user = currentUser
	} else {
		if dbErr := db.Where("id = ?", slug).First(&user).Error; dbErr != nil {
			c.AbortWithStatus(http.StatusNotFound)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"user":   user.Serialize(),
	})
}

// UpdateCurrentUser controller
func UpdateCurrentUser(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(models.User)

	c.BindJSON(&user)
	db.Save(&user)
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"user":   user.Serialize(),
	})
}
