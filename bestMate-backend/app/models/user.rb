class User < ApplicationRecord
    has_many :notes, through: :relatives
    has_many :allowed_foods
    has_secure_password
end
