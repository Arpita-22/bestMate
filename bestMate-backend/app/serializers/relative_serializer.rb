class RelativeSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :age, :relationship, :distance, :notes, :user_id

  def notes
    object.notes
  end

  belongs_to :user
  # has_many :notes
end
