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
