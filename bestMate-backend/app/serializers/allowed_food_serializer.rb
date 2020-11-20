class AllowedFoodSerializer < ActiveModel::Serializer
  attributes :id, :name

  belongs_to :user
  has_many :restaurants, through: :food_restaurants
end
