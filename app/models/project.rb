# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  description :string           default("")
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :integer
#
# Indexes
#
#  index_projects_on_user_id  (user_id)
#

class Project < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  has_many :tasks, dependent: :destroy
end
