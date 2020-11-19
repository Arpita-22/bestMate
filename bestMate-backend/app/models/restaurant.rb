class Restaurant < ApplicationRecord
    has_many :allowedfoods, through: :foodrestaurants
end
