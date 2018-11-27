package models

import (
	"github.com/jinzhu/gorm"
)

// Friendship type
type Friendship struct {
	gorm.Model
	UserID      uint
	FriendID    uint
	IsConfirmed bool `gorm:"default:false"`
}
