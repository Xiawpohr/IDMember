package models

import (
	"github.com/jinzhu/gorm"
)

// JSON alias type
type JSON = map[string]interface{}

// User Model
type User struct {
	gorm.Model
	Email     string `json:"email"`
	Password  string `json:"password"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Phone     string `json:"phone"`
	Bio       string `json:"bio"`
	Gender    string `json:"gender"`
	Birthday  string `json:"birthday"`
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
