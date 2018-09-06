# == Schema Information
#
# Table name: tasks
#
#  id          :integer          not null, primary key
#  description :string
#  row_order   :integer
#  status      :integer          default("open")
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  project_id  :integer
#
# Indexes
#
#  index_tasks_on_project_id  (project_id)
#  index_tasks_on_status      (status)
#

FactoryBot.define do
  factory :task do
    title "MyString"
    description "MyString"
  end
end
