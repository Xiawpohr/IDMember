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

// FetchAllFriendRequests controller
func FetchAllFriendRequests(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(models.User)

	var friendRequests []models.Friendship
	if err := db.Where("user_id = ? AND is_confirmed = ?", user.ID, false).Find(&friendRequests).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":         http.StatusOK,
		"friendRequests": friendRequests,
	})
}

// FetchAllFriendConfirmations controller
func FetchAllFriendConfirmations(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(models.User)

	var friendConfirmations []models.Friendship
	if err := db.Where("friend_id = ? AND is_confirmed = ?", user.ID, false).Find(&friendConfirmations).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":              http.StatusOK,
		"friendConfirmations": friendConfirmations,
	})
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

// ConfirmFriend controller
func ConfirmFriend(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(models.User)
	var friendRequestBody FriendRequestBody
	c.BindJSON(&friendRequestBody)

	var friendship models.Friendship
	err := db.Where("user_id = ? AND friend_id = ?", friendRequestBody.UserID, user.ID).First(&friendship).Error
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}
	friendship.IsConfirmed = true
	db.Save(&friendship)

	var friend models.User
	if err := db.Where("id = ?", friendRequestBody.UserID).First(&friend).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"friend": friend.Serialize(),
	})
}
