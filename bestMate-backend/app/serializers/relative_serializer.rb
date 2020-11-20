class RelativeSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :age, :relationship, :distance, :notes

  def notes
    object.notes
  end

  belongs_to :user
  # has_many :notes
end
