class NoteSerializer < ActiveModel::Serializer
  attributes :id, :description
  belongs_to :relative
end
