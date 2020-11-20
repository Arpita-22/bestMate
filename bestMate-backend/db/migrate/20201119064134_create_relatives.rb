class CreateRelatives < ActiveRecord::Migration[6.0]
  def change
    create_table :relatives do |t|
      t.string :name
      t.string :address
      t.integer :age
      t.string :relationship
      t.integer :distance
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
