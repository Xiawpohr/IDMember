package controllers

import (
	"IDMember/backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

// FetchAllFriends controller
func FetchAllFriends(c *gin.Context) {
	var friends []models.User
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(models.User)
	if err := db.Scopes(user.Friends()).Find(&friends).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		var friendsJSON []models.JSON
		for _, friend := range friends {
			friendsJSON = append(friendsJSON, friend.Serialize())
		}
		c.JSON(http.StatusOK, gin.H{
			"status":  http.StatusOK,
			"friends": friendsJSON,
		})
	}
}
