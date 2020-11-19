class AllowedFood < ApplicationRecord
  belongs_to :user
  has_many :restaurants, through: :food_restaurants
end
