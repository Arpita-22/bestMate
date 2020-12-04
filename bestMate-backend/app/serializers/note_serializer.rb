class NoteSerializer < ActiveModel::Serializer
  attributes :id, :description, :relative_id
  # belongs_to :relative
end
