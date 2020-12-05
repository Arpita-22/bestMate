class AllowedFoodSerializer < ActiveModel::Serializer
  attributes :id,:name,:user_id

  # belongs_to :user
  # has_many :restaurants, through: :food_restaurants
end
