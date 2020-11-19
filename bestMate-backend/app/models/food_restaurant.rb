class FoodRestaurant < ApplicationRecord
  belongs_to :allowed_food
  belongs_to :restaurant
end
