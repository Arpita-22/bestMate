class CreateFoodRestaurants < ActiveRecord::Migration[6.0]
  def change
    create_table :food_restaurants do |t|
      t.belongs_to :allowed_food, null: false, foreign_key: true
      t.belongs_to :restaurant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
