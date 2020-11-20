class FoodRestaurantSerializer < ActiveModel::Serializer
  attributes :id, :allowed_food_id, :restaurant_id

  belongs_to :allowed_food
  belongs_to :restaurant
end
