class User < ApplicationRecord
    has_many :relatives
    has_many :notes, through: :relatives
    has_many :allowed_foods
    has_many :food_restaurants, through: :allowed_foods
    has_many :restaurants, through: :food_restaurants
    has_secure_password
end
