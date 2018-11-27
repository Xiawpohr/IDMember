package middlewares

import (
	"IDMember/backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

//Authenticated middleware
func Authenticated() gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.User
		db := c.MustGet("db").(*gorm.DB)
		uid, err := c.Cookie("idmember_uid")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status":  http.StatusUnauthorized,
				"message": "You have to been log in first.",
			})
			return
		}

		if dbErr := db.Where("id = ?", uid).First(&user).Error; dbErr != nil {
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			c.Set("user", user)
		}

		c.Next()
	}
}
