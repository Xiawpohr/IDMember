package controllers

import (
	"IDMember/backend/models"

	"net/http"
	"strconv"

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

// FriendRequestBody type
type FriendRequestBody struct {
	UserID string `json:"userId" form:"userId"`
}

// RequestFriend controller
func RequestFriend(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(models.User)
	var friendRequestBody FriendRequestBody
	c.BindJSON(&friendRequestBody)

	var friend models.User
	if err := db.Where("id = ?", friendRequestBody.UserID).First(&friend).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	intFriendID, _ := strconv.Atoi(friendRequestBody.UserID)

	friendship := models.Friendship{
		UserID:   user.ID,
		FriendID: uint(intFriendID),
	}
	db.Create(&friendship)
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"friend": friend.Serialize(),
	})
}
