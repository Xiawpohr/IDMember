package models

import (
	"github.com/jinzhu/gorm"
)

// JSON alias type
type JSON = map[string]interface{}

// User Model
type User struct {
	gorm.Model
	Email      string `json:"email"`
	Password   string `json:"password"`
	Account    string `json:"account"`
	FirstName  string `json:"firstName"`
	LastName   string `json:"lastName"`
	Phone      string `json:"phone"`
	Bio        string `json:"bio"`
	Gender     string `json:"gender"`
	Birthday   string `json:"birthday"`
	Friendship []Friendship
}

// Serialize serializes user data
func (u *User) Serialize() JSON {
	return JSON{
		"id":        u.ID,
		"email":     u.Email,
		"firstName": u.FirstName,
		"lastName":  u.LastName,
		"phone":     u.Phone,
		"bio":       u.Bio,
		"gender":    u.Gender,
		"birthday":  u.Birthday,
	}
}

// Friends Scope
func (u *User) Friends() func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		var friendships []Friendship
		var friendIds []uint
		db.Model(&u).Association("Friendship").Find(&friendships)
		for _, relationship := range friendships {
			friendIds = append(friendIds, relationship.FriendID)
		}
		return db.Where(friendIds)
	}
}
