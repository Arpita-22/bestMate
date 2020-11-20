class Restaurant < ApplicationRecord
    has_many :food_restaurants
    has_many :allowed_foods, through: :food_restaurants
end
