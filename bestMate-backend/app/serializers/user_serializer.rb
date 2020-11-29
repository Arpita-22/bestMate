class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :age

  # def allowed_foods
  #   object.allowed_foods
  # end

  # def relatives
  #   object.relatives
  # end
  has_many :relatives
  # has_many :notes, through: :relatives
  has_many :allowed_foods
  # has_many :food_restaurants, through: :allowed_foods
  # has_many :restaurants, through: :allowed_foods
end
