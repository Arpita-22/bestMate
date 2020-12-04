class User < ApplicationRecord
    has_many :relatives, dependent: :destroy
    #has_many :notes, through: :relatives
    has_many :allowed_foods, dependent: :destroy
    #has_many :food_restaurants, through: :allowed_foods
    #has_many :restaurants, through: :food_restaurants

    has_secure_password

    validates :name, uniqueness: { case_sensitive: false }
    validates :password, confirmation: { case_sensitive: true }

end
