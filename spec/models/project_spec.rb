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

require 'rails_helper'

RSpec.describe Project, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
