class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :address

  has_many :allowed_foods, through: :food_restaurants
end
