package main

import (
	"IDMember/backend/models"

	"strconv"
	"strings"

	"github.com/icrowley/fake"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB
var err error

func main() {
	db, err = gorm.Open("sqlite3", "./tmp/gorm.db")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	db.DropTableIfExists("users", "friendships", "people")
	db.CreateTable(&models.User{}, &models.Friendship{})
	users := generateUsers()
	for _, user := range users {
		db.Create(&user)
	}

}

func generateUsers() []models.User {
	accounts := []string{
		"0x7A1723a4B45715F6359e12179476473A02671BDa",
		"0xfB7b6004cC56675E5bee2948Fd4CB0B2087F37b2",
		"0xec9B8Ff211398C6B1D9cC82bDa3579471a69d2A1",
		"0x5247f678a940A5A7Dd8C36213166807056D0011A",
		"0xE9c6cdF1642536C9a49B2D3e96C170B97668d095",
		"0x14A9D9DceEb228D4DD51377Efb405016e1162407",
		"0x22810544EeBC2f12d2610059F070C87786B68840",
		"0xf2c8e674b32f5bdd83D6A98032a52cb3f5947945",
		"0xf288F7B3d5AF4442A7D5482a201a7Ad0c660c442",
		"0x85c308Cb23d7a7e59C98B4b12915d1DB5577970f",
	}

	var users []models.User
	for i := 0; i < len(accounts); i++ {
		users = append(users, models.User{
			Email:     fake.EmailAddress(),
			Password:  "Aa=123",
			Account:   accounts[i],
			FirstName: fake.FirstName(),
			LastName:  fake.LastName(),
			Phone:     fake.Phone(),
			Bio:       fake.Sentences(),
			Gender:    fake.Gender(),
			Birthday:  getBirthday(fake.Year(1900, 2000), fake.MonthNum(), fake.Day()),
		})
	}
	return users
}

func getBirthday(y int, m int, d int) string {
	year := strconv.Itoa(y)
	month := strconv.Itoa(m)
	day := strconv.Itoa(d)
	birthday := []string{year, month, day}
	return strings.Join(birthday, "/")
}
