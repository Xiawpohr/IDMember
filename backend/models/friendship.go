package models

import (
	"github.com/jinzhu/gorm"
)

// Friendship type
type Friendship struct {
	gorm.Model
	UserID      uint `json:"from"`
	FriendID    uint `json:"to"`
	IsConfirmed bool `json:"-" gorm:"default:false"`
}
