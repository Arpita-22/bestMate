class AllowedFoodSerializer < ActiveModel::Serializer
  attributes :name,:user_id,:id

  belongs_to :user
  has_many :restaurants, through: :food_restaurants
end
